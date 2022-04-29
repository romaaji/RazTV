import React, { useState, useRef } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import firebase, { storage, emailAuthProvider } from '../../services/firebase'
import { movieService } from '../../services/movieService'
import SweetAlert from 'react-bootstrap-sweetalert';

import './Profile.css'

export default function Profile() {
    const user = firebase.auth().currentUser; //use authcontext to get current user
    const [imageUrl, setImageUrl] = useState(user.photoURL);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState(user.displayName);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const imageRef = useRef();
    const nameRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();


    async function handleSaveDetails(e) {
        e.preventDefault();

        setLoading(true);

        const userData = await movieService.getUserDetails(user.uid);

        if (imageRef.current.files.length > 0) {
            const uploadTask = storage.ref(`images/${imageRef.current.files[0].name}`)
                .put(imageRef.current.files[0]);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                },
                () => {
                    storage
                        .ref("images")
                        .child(imageRef.current.files[0].name)
                        .getDownloadURL()
                        .then(url => {
                            user.updateProfile({
                                photoURL: url
                            })
                            setImageUrl(url);
                            setImagePreview(null);

                            movieService.updateUserPhotoURL(url, user.uid, Object.keys(userData)[0]);

                            setSuccess(true);
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            )
        }
        if (nameRef.current.value.length > 0) {
            user.updateProfile({
                displayName: nameRef.current.value
            })
                .then(res => {
                    setName(nameRef.current.value);

                    movieService.updateUserDisplayName(
                        nameRef.current.value, user.uid, Object.keys(userData)[0]);

                    nameRef.current.value = '';

                    setSuccess(true);
                })
                .catch(err => {
                    setError(err.message);
                })
        }

        setLoading(false);
    }
    function handleImagePreview(e) {
        e.preventDefault();

        if (e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    }
    function handlePasswordChange(e) {
        e.preventDefault();

        if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
            setError('Passwords must match!')
            return;
        }

        const credential = emailAuthProvider.credential(
            user.email,
            oldPasswordRef.current.value
        );

        user.reauthenticateWithCredential(credential)
            .then(() => {
                user.updatePassword(newPasswordRef.current.value)
                    .then(() => {
                        newPasswordRef.current.value = '';
                        oldPasswordRef.current.value = '';
                        confirmNewPasswordRef.current.value = '';

                        setSuccess(true)
                    })
            })
            .catch(err => {
                setError(err.message);
            });
    }

    return (
        <div>
            <Header />
            {error && <SweetAlert timeout={1500} onConfirm={() => setError(false)} showConfirm={false} danger title={error} />}
            {success && <SweetAlert timeout={1500} onConfirm={() => setSuccess(false)} showConfirm={false} success title="Your details were updated successfully!"/>}


            <div className="catalog catalog--page">
                <div className="container">
                    <div className="profile__container">
                        <div className="profile">
                            <div className="profile__user">
                                <div className="profile__avatar">
                                    <img src={imageUrl} alt="" />
                                </div>
                                <div className="profile__meta">
                                    <h3>{name}</h3>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="sign__wrap">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <form onSubmit={handleSaveDetails} noValidate className="sign__form sign__form--profile sign__form--first">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4 className="sign__title">Profile details</h4>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                    <label className="sign__label" for="picture">Profile Picture</label>
                                                    <label className="sign__label btn-file">
                                                        Select a picture <input onChange={handleImagePreview} ref={imageRef} type="file" className="sign__input file__input" required />
                                                    </label>
                                                    <div className="profile__avatar preview__avatar">
                                                        <img id="frame" src={imagePreview} alt="" width="100" />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                    <div className="sign__group">
                                                        <label className="sign__label" for="firstname">New name</label>
                                                        <input ref={nameRef} type="text" name="name" className="sign__input" />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                </div>
                                                <div className="col-12">
                                                    <button disabled={loading} className="sign__btn" type="submit">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    
                                    <div className="col-12 col-lg-6">
                                        <form onSubmit={handlePasswordChange} className="sign__form sign__form--profile">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4 className="sign__title">Change password</h4>
                                                    <h4 className="sign__title">Disable On Demo</h4>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                    <div className="sign__group">
                                                        <label className="sign__label" for="oldpass">Old password</label>
                                                        <input readonly type="password" className="sign__input" />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                    <div className="sign__group">
                                                        <label className="sign__label" for="newpass">New password</label>
                                                        <input readonly type="password" className="sign__input" />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                                    <div className="sign__group">
                                                        <label className="sign__label" for="confirmpass">Confirm new password</label>
                                                        <input readonly type="password" className="sign__input" />
                                                    </div>
                                                </div>
                                                <div className="col-12 ">
                                                    <button className="sign__btn" type="submit">Change</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

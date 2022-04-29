import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SweetAlert from 'react-bootstrap-sweetalert';
import './Sign.css'

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    function handleSubmit(e) {
        e.preventDefault()

        login(emailRef.current.value, passwordRef.current.value)
            .then(res => {
                setError(false);
                setSuccess(true);
                setLoading(true);

                setTimeout(() => {
                    history.push('/')
                }, 1600)
            })
            .catch(error => {
                setError(error.message);
            });

        setLoading(false);
    }
    return (
        <div className="sign section--full-bg">
            {error && <SweetAlert timeout={1500} onConfirm={() => setError(false)} showConfirm={false} danger title={error} />}
            {success && <SweetAlert timeout={1500} onConfirm={() => setSuccess(false)} showConfirm={false} success title="You signed in successfully!" />}

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            <form onSubmit={handleSubmit} className="sign__form">
                                <p className="sign__logo">RazTV - Film</p>

                                <div className="sign__group">
                                    <input type="email" ref={emailRef} required className="sign__input" placeholder="Email" />
                                </div>
                                <div className="sign__group">
                                    <input type="password" ref={passwordRef} required className="sign__input" placeholder="Password" />
                                </div>
                                <button disabled={loading} className="sign__btn" type="submit">Sign in</button>
                                <span className="sign__text">Don't have an account? <Link to="/signup">Sign up!</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const apiKey = `YOUR THEMOVIEDB API`;
const url = `https://api.themoviedb.org/3/`;

export const movieService = {
    async getAllMovieGenres() {
        return await fetch(`${url}genre/movie/list?api_key=${apiKey}&language=en-US`)
            .then(res => res.json());
    },
    async getMoviesByGenre(id) {
        return await fetch(`${url}discover/movie?api_key=${apiKey}&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${id}`)
            .then(res => res.json());
    },
    async getPopularMovies() {
        return await fetch(`${url}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then(res => res.json());
    },
    async getTopClassicsMoviesOfAllTime() {
        return await fetch(`${url}discover/movie?api_key=${apiKey}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=1990-01-01&release_date.lte=2000-01-01&vote_average.gte=8`)
            .then(res => res.json());
    },
    async getMoviesByGenreCurrentPageAverageVoteReleaseYear(id, currentPage, averageVote, releaseYear) {
        return await fetch(`${url}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${id}&vote_average.gte=${averageVote}&primary_release_year=${releaseYear}`)
            .then(res => res.json());
    },
    async getMovieDetailsById(id) {
        return await fetch(`${url}movie/${id}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json());
    },
    async getMoviesBySearchInputCurrentPage(input, currentPage) {
        return await fetch(`${url}search/movie?api_key=${apiKey}&language=en-US&query=${input}&page=${currentPage}&include_adult=false`)
            .then(res => res.json());
    },
    async addComment(movieId, comment, userUid, currentDate) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Comments/${movieId}.json`;

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                comment,
                userUid,
                currentDate
            })
        }).then(res => res.json());
    },
    async getComments(movieId) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Comments/${movieId}.json`;

        return await fetch(url)
            .then(res => res.json());
    },
    async addUserDetails(displayName, photoURL, userUid) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Users/${userUid}.json`;

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                displayName,
                photoURL
            })
        }).then(res => res.json());
    },
    async getUserDetails(userUid) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Users/${userUid}.json`;

        return await fetch(url)
            .then(res => res.json());
    },
    async updateUserPhotoURL(photoURL, userUid, key) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Users/${userUid}/${key}.json`;

        return await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                photoURL
            })
        }).then(res => res.json());
    },
    async updateUserDisplayName(displayName, userUid, key) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Users/${userUid}/${key}.json`;

        return await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                displayName
            })
        }).then(res => res.json());
    },
    async addToFavorites(userUid, favorites) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Favorites/${userUid}.json`;

        return await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                favorites
            })
        }).then(res => res.json());
    },
    async getFavoriteMovies(userUid) {
        let url = `https://YOUR-FIREBASE-DB-URL.firebaseio.com/Favorites/${userUid}.json`;

        return await fetch(url)
            .then(res => res.json());
    }
}

import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { GlobalMovieProvider } from './context/GlobalMovieState'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import Home from './components/Home/Home'
import Catalog from './components/Catalog/Catalog'
import Details from './components/Details/Details'
import Category from './components/Category/Category'
import ScrollToTop from './components/ScrollToTop'
import PrivateRoute from './components/PrivateRoute'
import Search from './components/Search/Search'
import Profile from './components/Profile/Profile'
import Favorites from './components/Favorites/Favorites'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <GlobalMovieProvider>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/catalog" component={Catalog} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <PrivateRoute exact path="/categories/:genreId/:genreName/:currentPage" component={Category} />
            <PrivateRoute exact path="/details/:id" component={Details} />
            <PrivateRoute exact path="/search/:searchInput/:currentPage" component={Search} />
          </Switch>
        </Router>
      </GlobalMovieProvider>
    </AuthProvider>
  );
}

export default App;

import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
//import { render } from "react-dom";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import "./App.css";
import axios from "axios";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import SinUser from "./components/layouts/SinUser";
const App = () => {
  const [user, setUser] = useState([]);
  const [sinUser, setSinUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  let githubClientId;
  let githubClientSecret;
  if (process.env.NODE_ENV !== "production") {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }
  // async componentDidMount() {
  //   //console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_ID} & client_secret=
  //   ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ user: res.data, loading: false });
  // }
  //search github users
  const searchUsers = async (text) => {
    //console.log(text);
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${githubClientId} & client_secret=
    ${githubClientSecret}`);
    setUser(res.data.items);
    setLoading(false);
    //this.setState({ user: res.data.items, loading: false });
  };
  //get a single github user
  const getUser = async (username) => {
    //this.setState({ loading: true });
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=
    ${githubClientId} & client_secret=
    ${githubClientSecret}`);
    setSinUser(res.data);
    setLoading(false);
    //this.setState({ sinUser: res.data, loading: false });
  };
  //get single user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${githubClientId} & client_secret=
    ${githubClientSecret}`);
    setRepos(res.data);
    setLoading(false);
    //this.setState({ repos: res.data, loading: false });
  };
  //ClearUSers from state...
  const clearUsers = () => {
    setUser([]);
    setLoading(false);
  };
  //setalert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2300);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar></Navbar>
        <div className='container'>
          <Alert alert={alert}></Alert>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={user.length > 0 ? true : false}
                    setAlert={showAlert}
                  ></Search>
                  <Users loading={loading} users={user} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/sinUser/:login'
              render={(props) => (
                <SinUser
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  sinUser={sinUser}
                  repos={repos}
                  loading={loading}
                ></SinUser>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

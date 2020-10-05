import React, { useEffect, Fragment } from "react";
import Spinner from "../layouts/Spinner";
import Repos from "../repos/Repos";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const SinUser = ({ sinUser, loading, getUser, getUserRepos, repos, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = sinUser;

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-danger'>
        Go Back to Search
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp; Hireable:{""}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            alt=''
            src={avatar_url}
            className='round-img'
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio:</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-dark my-1'
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                ) && (
                  <a
                    href={blog}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-success my-1'
                  >
                    Visit Website
                  </a>
                )}
              <br />
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Followings: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

SinUser.propTypes = {
  loading: PropTypes.bool,
  sinUser: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
};
export default SinUser;

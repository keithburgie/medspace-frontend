import React, {Component, Fragment} from 'react';

const Profile = (props) => {
  // const { avatar, username, bio } = props

  return props.user ? (
    <Fragment>
      <img src={props.user.avatar} alt={props.user.username} />
      <h1>{props.user.username}</h1>
      <p>{props.user.bio}</p>
    </Fragment>
  ) : ''
}

export default Profile
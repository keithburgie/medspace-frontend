import React from 'react';
import {Container, Row,  Col} from 'reactstrap';

const Profile = (props) => {
  // const { avatar, username, bio } = props

  return props.user ? (
    <Container>
      <Row>
        <Col sm={4}>
          <img src={props.user.avatar} alt={props.user.username} />
        </Col>
        <Col sm={8}>
          <h1>{props.user.name}</h1>
          <p>will have a {props.user.bio}</p>
        </Col>
      </Row>
    </Container>
  ) : ''
}

export default Profile
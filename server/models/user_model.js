import _ from 'lodash';
import generateAuthToken from '../helpers/tokens';
import status from '../helpers/StatusCode';

class User {
  // initializing user array
  constructor() {
    this.users = [
      {
        id: 1,
        first_name: 'Schadrack',
        last_name: 'NGIRIMANA',
        email: 'chadrack@gmail.com',
        password: 'safari1006',
        address: 'Kigali,Rwanda',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
        occupation: 'software developer',
        expertise: 'HTML,CSS',
        is_mentor: false,
        is_admin: true,
      },
      {
        id: 2,
        first_name: 'iradukunda',
        last_name: 'chance',
        email: 'chance@gmail.com',
        password: 'iradukunda',
        address: 'Huye,Rwanda',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
        occupation: 'network engineer',
        expertise: 'ccna,cisco',
        is_mentor: false,
        is_admin: false,
      },
      {
        id: 3,
        first_name: ' safari',
        last_name: ' pascal',
        email: 'safari@gmail.com',
        password: 'safari1006',
        address: 'Musanze,Rwanda',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
        occupation: 'Health Doctor',
        expertise: 'Surgery',
        is_mentor: false,
        is_admin: false,
      },
    ];
  }

  // signup
  create = (payload) => {
    let {
      first_name, last_name, email, password, address, bio, occupation, expertise, is_mentor,
      is_admin,
    } = payload;
    if (is_admin === undefined) {
      is_admin = false;
    }
    if (is_mentor === undefined) {
      is_mentor = false;
    }

    const currentId = this.users.length + 1;
    let newUser = {
      token: generateAuthToken(currentId, is_admin, is_mentor),
      id: currentId,
      first_name,
      last_name,
      email,
      password,
      bio,
      address,
      occupation,
      expertise,
      is_mentor,
      is_admin,
    };
    this.users.push(newUser);
    console.log(newUser);
    newUser = {
      status: status.RESOURCE_CREATED,
      message: 'User created successfully',
      data: _.pick(newUser, ['token', 'id']),
    };

    return newUser;
  };

  login = (payload) => {
    // check if user email and password exists
    // in our user array
    const user = this.users.find((Wuser) => (Wuser.email === payload.email)
      && ((Wuser.password === payload.password)));
    if (!user) {
      return {
        status: status.UNAUTHORIZED,
        error: 'email or password is incorrect',
      };
    }
    let result = {
      token: generateAuthToken(user.id, user.is_admin, user.is_mentor),
      id: user.id,
    };
    result = {
      status: status.REQUEST_SUCCEEDED,
      message: 'User is successfully logged in',
      data: result,
    };
    return result;
  };


  // change user to a mentor
  changeToMentor = (res, id) => {
    // check if user exists in our users
    const user = this.users.find((u) => u.id === parseInt(id, 10));
    if (!user) return res.status(404).send({ status: 404, error: 'User is not found!' });
    // check if user is already mentor

    if (user.is_mentor) return res.status(409).send({ status: 409, error: 'User is already a mentor!' });
    // Go a head and change user to mentor
    user.is_mentor = true;
    return user;
  }

  // get all mentors
  getAllMentors = (_req, res) => {
    const mentorUsers = this.users.filter((user) => user.is_mentor === true);
    if (mentorUsers.length === 0) return res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Mentors re not available' });
    // return mentorUsers;
    let response = [];

    // eslint-disable-next-line guard-for-in
    for (let item in mentorUsers) {
      let mentor = {
        mentorId: mentorUsers[item].id,
        first_name: mentorUsers[item].first_name,
        last_name: mentorUsers[item].last_name,
        email: mentorUsers[item].email,
        address: mentorUsers[item].address,
        bio: mentorUsers[item].bio,
        occupation: mentorUsers[item].occupation,
        expertise: mentorUsers[item].expertise,
        is_mentor: mentorUsers[item].is_mentor,
        is_admin: mentorUsers[item].is_admin,
      };
      response.push(mentor);
    }
    return response;
  }

// unique mentor
uniqueMentor = (res, id) => {
  const mentorUser = this.users.find((u) => u.id === parseInt(id, 10));
  if (!mentorUser) return res.status(404).send({ status: 404, error: 'User is not found!' });
  if (mentorUser.is_mentor === false) {
    return res.status(400).send({ status: 400, error: 'User is not a mentor' });
  }

  let response = [];
  let mentor = {
    mentorId: mentorUser.id,
    first_name: mentorUser.first_name,
    last_name: mentorUser.last_name,
    email: mentorUser.email,
    address: mentorUser.address,
    bio: mentorUser.bio,
    occupation: mentorUser.occupation,
    expertise: mentorUser.expertise,
  };
  response.push(mentor);
  return response;
}

  // checking if user exist
  isUserExist = (user_id) => this.users.find((u) => u.id === user_id);

  // checking if email is taken
  isEmailTaken = (email) => this.users.find((u) => u.email === email)
}
export default new User();

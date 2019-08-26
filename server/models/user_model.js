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
  // checking if email is taken
  isEmailTaken = (email) => this.users.find((u) => u.email === email)


}
export default new User();

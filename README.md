
# Free-Mentors
Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

[![Build Status](https://travis-ci.org/ngirimana/Free-Mentors.svg?branch=develop)](https://travis-ci.org/ngirimana/Free-Mentors)       [![Coverage Status](https://coveralls.io/repos/github/ngirimana/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/ngirimana/Free-Mentors?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/98957c3773b0501405e5/maintainability)](https://codeclimate.com/github/ngirimana/Free-Mentors/maintainability)

## Getting Started


These are steps that should be followed by anyone who want toget a copy of project

The project is composed of two different sections:
- User Interface
- API

### Requirements

* User intrface
    * Any Web Browser (We recommend using Google Chrome)
    * Text Editor (VSCode is highly recommende)
    * User inteface login credential for mentor and admin

      ##### For admin
        * Email :admin@gmail.com
        * password :admin
      ##### For mentor
        * Email :mentor@gmail.com
        * password :mentor

* API Endpoints
   * Node JS
   * Postman
##  Features
   * Required Features
      1. Users can sign up.
      2. Users can sign in.
      3. Admin can change a user to a mentor.
      4. Users can view mentors.
      5. Users can view a specific mentor.
      6. Users can create a mentorship session request with a mentor.
      7. A mentor can accept a mentorship session request.
      8. A mentor can decline a mentorship session request.
   * Optional Features
      1. Users can view all their mentorship sessions.
      2. Users can review a mentor after a mentorship session.
      3. Admin can delete a review deemed as inappropriate.

## API
  * Required API
      1. POST /auth/signup
      2. POST /auth/signin
      3. PATCH /user/:userId
      4. GET /mentors
      5. GET/mentors/:mentorId
      6. POST/sessions
      7. PATCH /sessions/:sessionId/accept
      8. PATCH /sessions/:sessionId/reject
   * Optional
      1. GET /sessions
      2. POST /sessions/:sessionId/review
      3. DELETE /sessions/:sessionId/review

* use git bash:
   1. First [download](https://git-scm.com/downloads) git bash
   2. Install it
   3. Clone it by running `git clone https://github.com/ngirimana/Free-Mentors.git`
   4. Find the project directory from where you are tunning the git bash.

### Installing

1.For running the api

   1. First download and install [Node JS](https://nodejs.org/en/download/)
   2. Download and install [Postman](https://www.getpostman.com/downloads/)
   3. Clone the project. [free-mentors](https://github.com/ngirimana/Free-Mentors/tree/develop)
   4. Run `npm install` (`sudo apt install` for linux users) command for installing all project dependencies

## Running the tests

  1. Open command prompt
  2. navigate to the directory of cloned project
  3. Run the automated test by running `npm run test` command

## Running the UI Template

  - Just run `index.html` from the cloned project
  - OR simply use gh-page to run [Free-Mentors UI ](https://github.com/ngirimana/Free-Mentors/UI/)

## Used tools

* Server
   * Server side Framework: [Node JS](https://nodejs.org/)/[Express](https://expressjs.com/)
   * Linting Library: [ESLint](https://eslint.org)
   * Style Guide: [Airbnb](https://github.com/airbnb/javascript)
   * Testing Framework: [Mocha](https://mochajs.org/)
   * Documentation Tools: [Swagger](https://swagger.io/tools/swagger-ui/)


* User interface

   * CSS
   * HTML
   * JS
## Author

[NGIRIMANA Schadrack](https://github.com/ngirimana/)

## License

LICENCE - [LICENSE](LICENCE.md)


## Acknowledgments

* [Andela Kigali](https://andela.com/)
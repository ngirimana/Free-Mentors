const userLogin = () => {
  const login_email = document.querySelector('#login-email');
  const login_form = document.querySelector('#login-form');
  const login_pass = document.querySelector('#login-pass');
  const loginDirection = document.querySelector('#login-button');
  const mentorEmail = 'mentor@gmail.com';
  const mentorPass = 'mentor';
  const adminEmail = 'admin@gmail.com';
  const adminPass = 'admin';

  loginDirection.addEventListener('click', () => {
    if (login_email.value === mentorEmail && login_pass.value === mentorPass) {
      login_form.setAttribute('action', 'mentor.html');
    }
    if (login_email.value === adminEmail && login_pass.value === adminPass) {
      login_form.setAttribute('action', '../html/admin/dashboard.html');
    }
  });
};
userLogin();

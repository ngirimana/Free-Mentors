let remind = document.querySelector(".remind");
let closediv = document.querySelector(".forget-password")
let closesubform = document.querySelector("#close-subform")
let login_form=document.querySelector('#login-form');
let forgot_link=document.querySelector('#forgot-link')
let login_h=document.querySelector('#login-h')
let default_display=document.querySelector('.default-display')
remind.addEventListener('click', () => {
  default_display.classList.remove('default-display');
  closediv.style.display = "block"
  login_form.style.display="none"
  remind.style.display="none";
  forgot_link.style.display="none"
  login_h.style.display="none";



}
)
closesubform.addEventListener('click', (e) => {
  closediv.style.display = "none"
  login_form.style.display=""
  remind.style.display="";
  forgot_link.style.display=""
  login_h.style.display="";

})



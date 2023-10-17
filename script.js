function handleClickSendEmail(e) {
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();

  if (!validateEmail(email)) {
    showFormValidationMessage("Insira um e-mail válido!", true);
    setTimeout(() => {
      hideFormValidationMessage(true);
    }, 3000);

    return;
  }

  let successMessage;

  saveEmailInLocalStorage(email)
    ? (successMessage = "E-mail salvo com sucesso!")
    : (successMessage = "E-mail já cadastrado!");

  showFormValidationMessage(successMessage);
  setTimeout(hideFormValidationMessage, 3000);
}

/** @link https://stackoverflow.com/a/46181 */
function validateEmail(email) {
  const REGEXP_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.trim().toLowerCase().match(REGEXP_EMAIL);
}

function saveEmailInLocalStorage(email) {
  const NEWSLETTER_EMAILS_KEY_LOCAL_STORAGE = "newsletterEmails";
  const newsletterEmails =
    JSON.parse(localStorage.getItem(NEWSLETTER_EMAILS_KEY_LOCAL_STORAGE)) || [];

  if (newsletterEmails.includes(email)) {
    return false;
  }

  newsletterEmails.push(email);
  localStorage.setItem(
    NEWSLETTER_EMAILS_KEY_LOCAL_STORAGE,
    JSON.stringify(newsletterEmails)
  );

  return true;
}

function showFormValidationMessage(message, error = false) {
  const msgContainerSpan = document.querySelector("#msg-container");
  msgContainerSpan.textContent = message;
  msgContainerSpan.removeAttribute("hidden");

  error
    ? msgContainerSpan.classList.add("error-msg")
    : msgContainerSpan.classList.remove("error-msg");
}

function hideFormValidationMessage(error = false) {
  const msgContainerSpan = document.querySelector("#msg-container");
  msgContainerSpan.setAttribute("hidden", "hidden");
  msgContainerSpan.textContent = "";

  if (error) {
    msgContainerSpan.classList.remove("error-msg");
  }
}

function main() {
  document
    .querySelector("#input button")
    .addEventListener("click", handleClickSendEmail);
}

document.addEventListener("DOMContentLoaded", main);

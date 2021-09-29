const emailInput = document.querySelector("#email");
const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const required = (value) => {
  return typeof value === "string" && !!value;
};

const matchesRegex = (value, regex) => {
  return regex.test(value);
};

const showMessageError = (errorNode, errorMessage) => {
  errorNode.classList.remove("d-none");
  errorNode.textContent = errorMessage;
};

const hideMessageError = (errorNode) => {
  errorNode.classList.add("d-none");
  errorNode.textContent = "";
};

const validateField = (e, regex) => {
  const value = e.target.value.trim();
  const errorNode = e.target.nextElementSibling;

  if (!required(value)) {
    showMessageError(errorNode, "This field is required");
    return;
  }

  if (!matchesRegex(value, regex)) {
    showMessageError(errorNode, "Value is not valid");
    return;
  }

  hideMessageError(errorNode);
};

emailInput.addEventListener("change", function (e) {
  validateField(e, emailRegex);
});

emailInput.addEventListener("blur", function (e) {
  validateField(e, emailRegex);
});

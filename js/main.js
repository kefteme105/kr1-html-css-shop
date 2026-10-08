const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const cancelDialogButton = document.getElementById('cancel-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

function openOrderDialog(productName) {
  selectedProductInput.value = productName;
  successMessage.hidden = true;
  orderDialog.showModal();
  document.getElementById('order-name').focus();
}

function closeOrderDialog() {
  orderDialog.close();
}

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openOrderDialog(button.dataset.product);
  });
});

closeDialogButton.addEventListener('click', closeOrderDialog);
cancelDialogButton.addEventListener('click', closeOrderDialog);

orderDialog.addEventListener('click', (event) => {
  if (event.target === orderDialog) {
    closeOrderDialog();
  }
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;
  orderForm.reset();
  closeOrderDialog();
});

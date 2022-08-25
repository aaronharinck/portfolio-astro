{
  const handleSubmitForm = e => {
    const $form = e.currentTarget;
    if (!$form.checkValidity()) {
      e.preventDefault();

      const fields = $form.querySelectorAll(`.input`);
      fields.forEach(showValidationInfo);

      $form.querySelector(`.error`).innerHTML = `Oops! Het lijkt erop dat je niet alles correct hebt ingevuld`;
    } else {
      console.log(`Form is valid => submit form`);
    }
  };

  const showValidationInfo = $field => {
    let message;
    if ($field.validity.valueMissing) {
      message = `Dit veld moet je invullen, vergeetkous`;
    }
    if ($field.validity.typeMismatch) {
      message = `Oopsie, vekreerd type`;
    }
    if ($field.validity.rangeOverflow) {
      const max = $field.getAttribute(`max`);
      message = `Te groot, max ${max}`;
    }
    if ($field.validity.rangeUnderflow) {
      const min = $field.getAttribute(`min`);
      message = `Te klein, min ${min}`;
    }
    if ($field.validity.tooShort) {
      const min = $field.getAttribute(`minlength`);
      message = `Te kort, minimum lengte is ${min}`;
    }
    if ($field.validity.tooLong) {
      const max = $field.getAttribute(`maxlength`);
      message = `Te lang, maximum lengte is ${max}`;
    }
    if (message) {
      $field.parentElement.querySelector(`.error`).textContent = message;
    }
  };

  const handeInputField = e => {
    const $field = e.currentTarget;
    if ($field.checkValidity()) {
      $field.parentElement.querySelector(`.error`).textContent = ``;
      if ($field.form.checkValidity()) {
        $field.form.querySelector(`.error`).innerHTML = ``;
      }
    }
  };

  const handeBlurField = e => {
    const $field = e.currentTarget;
    showValidationInfo($field);
  };

  const addValidationListeners = fields => {
    fields.forEach($field => {
      $field.addEventListener(`input`, handeInputField);
      $field.addEventListener(`blur`, handeBlurField);
    });
  };

  const init = () => {
    const $form = document.querySelector(`form`);
    $form.noValidate = true;
    $form.addEventListener(`submit`, handleSubmitForm);

    const fields = $form.querySelectorAll(`.input`);
    addValidationListeners(fields);
  };

  init();
}

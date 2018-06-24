export function formValidation(form, validation) {
  let validated = {
    form: [],
    valid: true
  };
  validation.forEach((e, i) => {
    validated.form.push({
      field: e.field,
      validation: []
    });
    if (typeof e.required !== 'undefined') {
      if (form[e.field].value === "") {
        validated.valid = false;
        validated.form[i].validation.push({
          name: "required",
          correct: false
        });
      } else {
        validated.form[i].validation.push({
          name: "required",
          correct: true
        });
      }
    }
    if (typeof e.minLength !== 'undefined') {
      if (form[e.field].value.length < e.minLength) {
        validated.valid = false;
        validated.form[i].validation.push({
          name: "minLength",
          correct: false
        });
      } else {
        validated.form[i].validation.push({
          name: "minLength",
          correct: true
        });
      }
    }
    if (typeof e.maxLength !== 'undefined') {
      if (form[e.field].value.length > e.maxLength) {
        validated.valid = false;
        validated.form[i].validation.push({
          name: "maxLength",
          correct: false
        });
      } else {
        validated.form[i].validation.push({
          name: "maxLength",
          correct: true
        });
      }
    }
    if (typeof e.sameAs !== 'undefined') {
      if (form[e.field].value !== form[e.sameAs].value) {
        validated.valid = false;
        validated.form[i].validation.push({
          name: "sameAs",
          correct: false
        });
      } else {
        validated.form[i].validation.push({
          name: "sameAs",
          correct: true
        });
      }
    }
    if (typeof e.regex !== 'undefined') {}
  });
  return validated;
}
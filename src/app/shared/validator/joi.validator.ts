import { FormGroup, ValidatorFn } from '@angular/forms';

export const joiValidatorFromSchema = (schema:any): ValidatorFn => {
  // @ts-ignore
  const validator: ValidatorFn = (group: FormGroup) => {
    // This is where the validation on the values of
    // the form group is run.
    const result = schema.validate(group.value, {
      allowUnknown: true,
    });


    if (result.error) {
      const errorObj = result.error.details.reduce((acc: any, current: any) => {
        const key = current.path.join('.');
        acc[key] = current.message;
        return acc;
      }, {})

      // Set error value on each control
      for (const key in errorObj) {
        const control = group.get(key);
        if (control) {
          control.setErrors({ [key]: errorObj[key] });
        }
      }

      // Return the error object so that we can access
      // the form’s errors via `form.errors`.
      // console.log('*** Joi validate errorObj', errorObj); // TODO: Remove
      return errorObj;
    } else {
      return null;
    }
  };

  return validator;
}

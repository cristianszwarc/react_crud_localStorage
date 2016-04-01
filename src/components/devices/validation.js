export default function DeviceValidation(data) {
  const errors = {};
  if(!data.title) {
    errors.title = 'Required';
  }
  if(data.title && data.title.length < 3) {
    errors.title = 'Must be longer than 3 characters';
  }
  return errors;
}

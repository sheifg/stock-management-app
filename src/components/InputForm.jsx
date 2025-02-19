import { TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";

const InputForm = ({ name, label, errors, touched }) => {
  //name is a variable and may be equal to "username", "email", "password",...
  return (
    <Field
      as={TextField}
      name={name}
      fullWidth
      label={label}
      required
      margin="dense"
      // It is had tu use dynamic related to the name, using square brackets notation, because allows dynamic access by using variables as keys. Wit dot notation that it is not possible
      error={Boolean(errors[name]) && touched[name]}
      helperText={touched[name] ? errors[name] : ""}
    />
  );
};

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default InputForm;




// To avoid these errors --> 'errors.username' is missing in props validationeslintreact/prop-types
// To make validation as props and avoid that problem, it is necessary to use proptypes
// It is the best practice to identify the type of the props
// pnpm i prop-types
// Then include InputForm.propTypes = {}
// propTypes is a kind of implementation of TypeScript

// JavaScript objects
// access the object properties using the dot notation
// const person = {
//   name: 'John',
//   age:25,
//   location: 'USA'
// }

// console.log(person.name) // John
// console.log(person.age) // 25
// console.log(person.location) // USA

// const key = 'age'
// It can't be used dot notation to access the object properties when the property name is stored in a variable
// console.log(person.key) // undefined
// console.log(person[key]) // 25

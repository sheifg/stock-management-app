import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputForm from "../components/InputForm";
import LoginRegisterComponent from "../components/LoginRegisterComponent";
import PasswordForm from "../components/PasswordForm";
import { login } from "../store/auth";

const Login = () => {
  const inputLabels = [
    { name: "email", label: "Email", Component: InputForm },
    { name: "password", label: "Password", Component: PasswordForm },
  ];

  const initialValues = {
    password: "",
    email: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch is used to call the function register to fetching the api and then update the state
  // 1- Visit the api and create the user -> dispatch a function for that
  // it will be had a response
  // 2- With the response it is necessary to updat the state -> dispatch to update the state
  // both happens when the button is clicked

  const handleSubmit = (values, actions) => {
    // e.preventDefault();
    // In case it is wanted to write, it will be like follows, but Formik does automatically
    //actions.setSubmitting(false);
    dispatch(login(values, navigate));
    // Reset the form after submitting
    // To reset the form it is needed another parameter actions(is an object)
    actions.reserForm();
  };

  // Validation squema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    // It will check in the order that it is written here, the requirements
    // It is not needed the validation for password in Login, just when a account in register is created
    password: Yup.string()
      // .min(8, "Password must be at least 8 characters")
      // .max(20, "Password must be at most 20 characters")
      // .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
      // .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
      // .matches(/[0-9]+/, "Password must contain at least one number")
      // .matches(
      //   /[^A-Za-z0-9]+/,
      //   "Password must contain at least one special character"
      // )
      .required("Password is required"),
    // /[a-z]/ regex
    // /[^A-Za-z0-9]+/ represents special characters
    // ^ means anything excepts this one
    // + means at least in this range(uppercase, numbers, lowercase) it si wanted one character
  });

  return (
    <LoginRegisterComponent
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      inputLabels={inputLabels}
      pageName="Login"
      navigateText="Don't have an account? Register"
      navigateTo="/register"
    />
  );
};

export default Login;

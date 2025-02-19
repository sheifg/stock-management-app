import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputForm from "../components/InputForm";
import LoginRegisterComponent from "../components/LoginRegisterComponent";
import PasswordForm from "../components/PasswordForm";
import { register } from "../store/auth";

const Register = () => {
  const inputLabels = [
    { name: "username", label: "Username", Component: InputForm },
    { name: "email", label: "Email", Component: InputForm },
    { name: "firstName", label: "First Name", Component: InputForm },
    { name: "lastName", label: "Last Name", Component: InputForm },
    { name: "password", label: "Password", Component: PasswordForm },
  ];

  const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    // e.preventDefault();
    // Formik does automatically the follwoing line, so it is not necessary to include it
    actions.setSubmitting(false);
    dispatch(register(values, navigate));
    actions.reserForm();
  };

  // Validation squema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]+/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]+/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  return (
    <LoginRegisterComponent
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      inputLabels={inputLabels}
      pageName="Register"
      navigateText="Already have an account? Login"
      navigateTo="/"
    />
  );
};

export default Register;

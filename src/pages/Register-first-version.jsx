import {
  Box,
  Button,
  Card,
  CardContent,
  //   Grid2 as Grid,
  Grid, //Grid2 is not working properly, so it will be still used Grid(it is shown as deprecated)
  Stack,
  Typography,
} from "@mui/material";
import image from "../assets/loginRegister.svg";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputForm from "../components/InputForm";
import PasswordForm from "../components/PasswordForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    dispatch(register(values, navigate));
    actions.reserForm();
  };

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
    // Box is like a div, but with more things
    // For all the components it is necessary to use sx for styling, for Box is not need it as props hthe same things as you write inside the sx. The better approach is used sx for all
    // Using minHeight 100vh insted of height 100vh,minHeight is the visible prt will be 100vh, can be more, so it wont be any white part visible more
    <Box width="100%" minHeight="100vh" bgcolor="#052159">
      <Typography variant="h2" color="white" component="h1" align="center">
        Item Stock Management
      </Typography>
      {/* deprectaed means it will be not used in the next updates, it would be necessary to check the doc. There are using Grid v
      https://mui.com/material-ui/react-grid2/ */}
      <Grid container p={5} alignItems="center" justifyContent="center">
        <Grid item md={6} xl={8} display={{ xs: "none", sm: "block" }}>
          <img
            src={image}
            alt="login-register-image"
            style={{ maxHeight: "80vh" }}
          />
        </Grid>
        <Grid item xl={4} xs={12} md={6}>
          <Card sx={{ maxWidth: "100%", padding: "2rem" }}>
            <CardContent>
              <Typography variant="h3" align="center" mb={3}>
                Register
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {/* Define my formik */}
                {/* If there is any validation error, it can be shown it here with a function */}
                {({ errors, touched }) => (
                  <Form>
                    {/* Mapping the inputLabels using the components that they are being created */}
                    {inputLabels.map((item, index) => (
                      <item.Component
                        key={index}
                        name={item.name}
                        label={item.label}
                        errors={errors}
                        touched={touched}
                      />
                    ))}
                    {/*Field as={TextField}: Renaming Field from formik as TextField from mui looks like more like an input */}
                    {/* <Field
                      as={TextField}
                      name="username"
                      fullWidth
                      label="username"
                      required
                      //   giving more margin
                      margin="dense"
                      //   margin="normal"
                      // if there is an error it become red: true. we will do progamtaically, so we need to wrap that with a function
                      // if you have an error in the username, we eill display the error
                      // styling
                      error={Boolean(errors.username) && touched.username}
                      // if there is an error i will display that one here
                      // touched.xxx is a boolean
                      // it is not necessary t memorize, you can copy it
                      // to show the text error
                      helperText={touched.username ? errors.username : ""}
                      //to receive the errors we have to check if the username was entered
                    /> */}
                    {/* <InputForm name='username' label='Username' errors={errors} touched={touched}/> */}

                    {/* <Field
                      as={TextField}
                      name="email"
                      fullWidth
                      label="email"
                      required
                      margin="dense"
                      error={Boolean(errors.email) && touched.email}
                      helperText={touched.email ? errors.email : ""}
                    /> */}
                    {/* <PassordForm name="password"
                      label="Password"
                      errors={errors}
                      touched={touched}
                    /> */}
                    {/* Stack is flex */}
                    <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button variant="contained" type="submit" size="large">
                        Register
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
              <Typography
                variant="subtitle2"
                align="center"
                component="div"
                sx={{ cursor: "pointer", mt: 1, color: "goldenrod" }}
                onClick={() => navigate("/")}
              >
                Have an account?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;

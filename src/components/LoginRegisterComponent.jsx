import { Button, Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import image from "../assets/loginRegister.svg";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginRegisterComponent = ({
  initialValues,
  validationSchema,
  handleSubmit,
  inputLabels,
  pageName,
  navigateText,
  navigateTo,
}) => {
  const navigate = useNavigate();
  return (
    <Box width="100%" minHeight="100vh" bgcolor="#052159">
      <Typography variant="h2" color="white" component="h1" align="center">
        Item Stock Management
      </Typography>
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
                {pageName}
              </Typography>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {/* If there is any validation error, it can be shown it here with a function */}
                {({ errors, touched }) => (
                  <Form>
                    {inputLabels.map((item, index) => (
                      <item.Component
                        key={index}
                        name={item.name}
                        label={item.label}
                        errors={errors}
                        touched={touched}
                      />
                    ))}
                    <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button variant="contained" type="submit" size="large">
                        {pageName}
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
                onClick={() => navigate(navigateTo)}
              >
                {navigateText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

LoginRegisterComponent.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputLabels: PropTypes.array.isRequired,
  pageName: PropTypes.string.isRequired,
  navigateText: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

export default LoginRegisterComponent;

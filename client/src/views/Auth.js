import LoginForm from "../components/auth/LoginForm";

const Auth = ({ authRoute }) => {
  return (
    <>
      Learn it
      {authRoute === "login" && <LoginForm />}
    </>
  );
};

export default Auth;

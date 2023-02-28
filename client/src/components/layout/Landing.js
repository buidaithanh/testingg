import { Navigate } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h1>Landingd</h1>
      {true && <Navigate to="/login" replace={true} />}
    </>
  );
};

export default Landing;

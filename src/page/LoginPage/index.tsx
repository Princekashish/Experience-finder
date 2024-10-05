import React from "react";
import LoginForm from "../../components/shared/Form/LoginForm";
const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginForm onClose={() => console.log("car")} />
    </div>
  );
};

export default LoginPage;

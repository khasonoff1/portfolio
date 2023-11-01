import { useState } from "react";
import { Button, Flex } from "antd";
import PropTypes from "prop-types";

import LoginForm from "../../../components/form/LoginForm";
import RegisterForm from "../../../components/form/RegisterForm";

const LoginRegisterPage = () => {
  const [toLogin, setToLogin] = useState(true);
  const [toRegister, setToRegister] = useState(false);

  const backLogin = () => {
    setToLogin(true);
    setToRegister(false);
  };
  const backRegister = () => {
    setToRegister(true);
    setToLogin(false);
  };

  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <div className={toLogin ? "d-block" : "d-none"}>
        <LoginForm />
        <Button type="primary" className="w-100 mt-3" style={{background: "#8a2be2"}} onClick={backRegister}>
          Register
        </Button>
      </div>
      <div className={toRegister ? "d-block" : "d-none"}>
        <RegisterForm />
        <Button type="primary" className="w-100 mt-3" style={{background: "#8a2be2"}} onClick={backLogin}>
          Login
        </Button>
      </div>
    </Flex>
  );
};

LoginRegisterPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginRegisterPage;

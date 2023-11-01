import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Button, Form, Input } from "antd";

import { setAuth } from "../../redux/slices/auth";
import { TOKEN, USER } from "../../constants";
import request from "../../server";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = async (values) => {
        const {
            data: { token, user },
        } = await request.post("auth/login", values);

        Cookies.set(TOKEN, token);
        localStorage.setItem(USER, JSON.stringify(user));
        navigate("/dashboard");

        dispatch(setAuth(user));
    };

    return (
        <Fragment>
            <Form
                name="login"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 600,
                    padding: "30px",
                    border: "1px solid black",
                    borderRadius: "10px",
                }}
                onFinish={submit}
                autoComplete="off"
            >
                <Form.Item
                    label="Username or Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button style={{ width: "100%",background: "#8a2be2" }} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default LoginForm;

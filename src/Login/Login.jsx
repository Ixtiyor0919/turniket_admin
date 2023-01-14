import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification } from "antd";
import useToken from "../Hook/UseToken";
import Loading from "../Components/Loading";
import "./Login.css";
import rasm from "./loginPicture.jpg";
import { FrownOutlined } from "@ant-design/icons";
import turnstileLogo from './turnstileLogo.jpg'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { token, setToken } = useToken();
    let navigate = useNavigate();

    const onFinish = (values) => {
        if (values.phoneNumber === "123456" && values.password === "123456") {
            setToken("socksToken", values.remember);
            window.location.href = "/";
        } else {
            notification["error"]({
                message: "Kirishda xatolik",
                description:
                    "Telefon nomer yoki parolni noto'g'ri kiritdingiz.",
                duration: 3,
                icon: <FrownOutlined style={{ color: "#f00" }} />,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.error(errorInfo);
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper" style={{height: '70vh'}}>
                    <img src={turnstileLogo} alt="Login" styele={{width: '100%'}} />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Xush Kelibsiz</p>
                    <p>Sahifaga kirish</p>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Iltimos telefon nomeringizni kiriting!",
                            },
                        ]}
                    >
                        <Input placeholder="Telefon nomeringizni kiriting" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Iltimos Parolingizni kiriting!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Parolingizni kiriting" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Meni eslab qol</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            KIRISH
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;

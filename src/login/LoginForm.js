import React, { useState, useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Card } from "antd";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import Header from "../header/header";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        // console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            // console.log(user);
            navigate('/');
        })
        .catch(err => {
            if (err.code == "auth/wrong-password") {
                alert('비밀번호가 틀렸습니다.')
            }
            if (err.code == "auth/user-not-found") {
                alert('사용자를 찾을 수 없습니다.')
            }
            if (err.code == "auth/invalid-email") {
                alert('유효하지 않은 이메일입니다.')
            }
        })
    }, [email, password]);

    return (
    <>
        <Header />
        <Form onFinish={onSubmitForm} className="form">
            <Card className="formcard">
                <div className="loginform">
                <h1 className="logintitle">전공을 빌리다..</h1>
                <div>
                    <br />
                    
                    <Input size="large" prefix={<UserOutlined />} name="user-email"  value={email} onChange={onChangeEmail} placeholder=" 이메일" required className="input"/>
                </div>
                <div>
                    <br />
                    
                    <Input size="large" prefix={<LockOutlined />} name="user-password" type="password" value={password} onChange={onChangePassword} placeholder=" 비밀번호" required className="input"/>
                </div>
                <br/>
                    <Button size="large" type="primary" block class="btn btn-primary" htmlType="submit" className="input" >로그인</Button>
                <br/>
                <br/>
                    <Link to="/signup">
                        <Button size="large" type="dashed" className="input" >계정이 없으신가요? 가입하기</Button>
                    </Link>
                
            </div>
            </Card>
        </Form>
        </>
    );
};

export default LoginForm;

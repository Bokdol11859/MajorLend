import React, { useState, useCallback } from 'react';
import {SmileOutlined, LockOutlined, UserOutlined, HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Card } from 'antd';
import "./login.css";
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Header from "../header/header";


const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordcheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    
    const onSubmit = useCallback(() => {
        if (password !== passwordcheck) {
            return setPasswordError(true);
        }
        console.log(name, email, password, passwordcheck);

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const docRef = await addDoc(collection(db, "users"), {
                name,
                email,
                uid: user.uid,
            })
            navigate("/");
        })
        .catch(err => {
            if (err.code == 'auth/weak-password') {
                alert('비밀번호가 너무 짧습니다.')
            }
            if (err.code == 'auth/email-already-in-use') {
                alert('이미 사용 중인 이메일입니다.')
            }
            if (err.code == 'auth/invalid-email') {
                alert('유효하지 않은 이메일입니다.')
            }
        })
    }, [password, passwordcheck]);


    return (
        <>
        <Header />
            <Form onFinish={onSubmit} className="form" >
            <Card className="formcard">
                <div className="loginform">
                    <h1 className="logintitle">전공을 빌리다..</h1>
                    <br/>
                    <Form.Item>
                        <Input size="large" prefix={<SmileOutlined />} name="user-name"  value={name} onChange={onChangeName} placeholder=" 이름" required className="input" />
                    </Form.Item>
                    <Form.Item>
                        <Input size="large" prefix={<UserOutlined />} name="user-email"  value={email} onChange={onChangeEmail} placeholder=" 이메일" required className="input" />
                    </Form.Item>
                    <Form.Item>
                        <Input size="large" prefix={<LockOutlined />} name="user-password" type="password" value={password} onChange={onChangePassword} placeholder=" 비밀번호" required className="input" />
                    </Form.Item>
                    <Form.Item 
                        hasFeedback 
                        validateStatus={passwordError? 'error' : 'none'} 
                        help={passwordError? "비밀번호가 일치하지 않습니다" : ""}>
                        <Input 
                            size="large" 
                            prefix={<CheckCircleOutlined />} 
                            name="user-passwordcheck" 
                            type="password" 
                            value={passwordcheck} 
                            onChange={onChangePasswordCheck} 
                            placeholder=" 비밀번호 확인" 
                            required
                            className="input"
                        />
                    </Form.Item>
                    <Button size="large" className="input" type="primary" block class="btn btn-primary" htmlType="submit" >회원가입</Button>
                </div>
                </Card>
            </Form>
        </>
    )

}

export default SignUpForm

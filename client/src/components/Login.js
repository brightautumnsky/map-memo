import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaMapPin, FaPaw } from "react-icons/fa";
import axios from "axios";

const LoginWrapper = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .register-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    width: 200px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  input {
    border: none;
    border-bottom: 1px solid #5584ac;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
  input::placeholder {
    font-size: 12px;
    color: darkgray;
  }
  button {
    cursor: pointer;
    background: #5584ac;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 3px 6px;
  }
  .login-success {
    color: seagreen;
  }
  .login-failure {
    color: red;
  }
  .login-result-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    .login-success {
      color: seagreen;
    }
    .login-failure {
      color: red;
    }
  }
  .login-cancel {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: orange;
    &:hover {
      color: #5584ac;
    }
  }
`;

const Login = ({ setLoginModal }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      setError(false);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <LoginWrapper>
      <div className="login-title">
        <h4>
          <FaMapPin style={{ color: "#5584ac" }} /> Let's Memo Our Travel!
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange placeholder="이름" ref={nameRef} />
        <input
          name="password"
          onChange
          placeholder="비밀번호"
          ref={passwordRef}
        />
        <button>로그인</button>
      </form>
      <div className="login-result-box">
        {success && (
          <span className="login-success">로그인이 완료되었습니다.</span>
        )}
        {error && (
          <span className="login-failure">로그인 오류가 발생했습니다.</span>
        )}
      </div>
      <div className="login-cancel" onClick={() => setLoginModal(false)}>
        <span>나가기</span>
        <FaPaw />
      </div>
    </LoginWrapper>
  );
};

export default Login;

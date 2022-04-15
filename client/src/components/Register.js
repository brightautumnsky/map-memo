import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaMapPin, FaPaw } from "react-icons/fa";
import axios from "axios";

const RegisterWrapper = styled.div`
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
    height: 150px;
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
  .register-success {
    color: seagreen;
  }
  .register-failure {
    color: red;
  }
  .register-result-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    .register-success {
      color: seagreen;
    }
    .register-failure {
      color: red;
    }
  }
  .register-cancel {
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

const Register = ({ setRegisterModal }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <RegisterWrapper>
      <div className="register-title">
        <h4>
          <FaMapPin style={{ color: "#5584ac" }} /> Let's Memo Our Travel!
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange placeholder="이름" ref={nameRef} />
        <input name="email" onChange placeholder="이메일" ref={emailRef} />
        <input
          name="password"
          onChange
          placeholder="비밀번호"
          ref={passwordRef}
        />
        <button>회원가입</button>
      </form>
      <div className="register-result-box">
        {success && (
          <span className="register-success">회원가입이 완료되었습니다.</span>
        )}
        {error && (
          <span className="register-failure">
            회원가입 오류가 발생했습니다.
          </span>
        )}
      </div>
      <div className="register-cancel" onClick={() => setRegisterModal(false)}>
        <span>나가기</span>
        <FaPaw />
      </div>
    </RegisterWrapper>
  );
};

export default Register;

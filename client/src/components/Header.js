import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Register from "./Register";
import Login from "./Login";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px 12px;
  align-items: center;
  background: transparent;
  z-index: 7;
`;

const ButtonBox = styled.div`
  display: flex;
  & > * {
    margin-left: 12px;
  }
`;

const Header = ({ title, currentUser }) => {
  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <HeaderWrapper>
      <div>
        <span>{title}</span>
      </div>
      <ButtonBox>
        {currentUser ? (
          <Button setting="logout" text="로그아웃" />
        ) : (
          <div>
            <Button
              setting="login"
              text="로그인"
              onClick={() => setRegisterModal(true)}
            />
            <Button
              setting="register"
              text="회원가입"
              onClick={() => setRegisterModal(true)}
            />
          </div>
        )}
      </ButtonBox>
      {registerModal && <Register setRegisterModal={setRegisterModal} />}
      {loginModal && <Login setLoginModal={setLoginModal} />}
    </HeaderWrapper>
  );
};

export default Header;

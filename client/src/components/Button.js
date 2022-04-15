import React from "react";
import styled, { css } from "styled-components";

const nameType = {
  register: {
    bg: "#5584ac",
    color: "white",
  },
  login: {
    bg: "#ececec",
    color: "darkgray",
  },
  logout: {
    bg: "red",
    color: "white",
  },
};

const ButtonWrapper = styled.button`
  border: none;
  cursor: pointer;
  font-size: 17.5px;
  padding: 9px 15px;
  margin-left: 20px;
  border-radius: 12px;
  font-weight: 800;

  ${({ setting }) =>
    setting &&
    css`
      background: ${nameType[setting].bg};
      color: ${nameType[setting].color};
    `}
`;

const Button = ({ text, setting, onClick }) => {
  return (
    <ButtonWrapper setting={setting} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default Button;

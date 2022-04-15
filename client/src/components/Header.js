import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 7;
  span {
    background: #ececec;
    padding: 3px 6px;
  }
`;

const Header = ({ title }) => {
  return (
    <HeaderWrapper>
      <span>{title}</span>
    </HeaderWrapper>
  );
};

export default Header;

import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
`;

const Header = ({ title }) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
};

export default Header;

import { styled } from "styled-components";

const StyledFooter = styled.footer`
  padding: 24px 16px;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; 2024 PAKEISTI </p>
    </StyledFooter>
  );
};

export default Footer;

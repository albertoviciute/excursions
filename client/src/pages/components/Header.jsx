import { styled } from "styled-components";
import logo from "../../assets/react.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

const HeaderWrapper = styled.header`
  background-color: #f0f0f0;
  padding: 20px 16px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
`;

const Logo = styled.img``;

const Navigation = styled.nav``;

const LinkItem = styled.li`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Links = styled.ul`
  display: flex;
  gap: 10px;
`;

const Header = () => {
  const { logoutUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <Container>
        <LogoContainer>
          <Link to="/">
            {/* PAKEISTI LOGO */}
            <Logo src={logo} alt="Logo" />
          </Link>
        </LogoContainer>
        <Navigation>
          <Links>
            <LinkItem>
              <StyledLink to="/">Home</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/tours">Tours</StyledLink>
            </LinkItem>
            {isAuthenticated ? (
              <LinkItem onClick={handleLogout}>Sign out</LinkItem>
            ) : (
              <>
                <LinkItem>
                  <StyledLink to="/signup">Sign up</StyledLink>
                </LinkItem>
                <LinkItem>
                  <StyledLink to="/register">Register</StyledLink>
                </LinkItem>
              </>
            )}
          </Links>
        </Navigation>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;

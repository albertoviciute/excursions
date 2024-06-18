import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Footer from "./pages/components/Footer";
import Error from "./pages/error/Error";
import Header from "./pages/components/Header";
import { styled } from "styled-components";
import Home from "./pages/home/Home";
import Register from "./pages/user/Register";
import Tours from "./pages/tours/Tours";
import Tour from "./pages/tours/Tour";
import CreateTour from "./pages/tours/CreateTour";
import { AuthContext } from "./utils/AuthContext";
import SignIn from "./pages/user/SignIn";

const Content = styled.div`
  min-height: calc(100vh - 138px);
`;

function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated;
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<Tour />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {isAdmin && <Route path="/create-tour" element={<CreateTour />} />}
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Footer from "./pages/components/Footer";
import Error from "./pages/error/Error";
import Header from "./pages/components/Header";
import SignUp from "./pages/user/SignUp";
import { styled } from "styled-components";
import Home from "./pages/home/Home";
import Register from "./pages/user/Register";
import Tours from "./pages/tours/Tours";

const Content = styled.div`
  min-height: calc(100vh - 138px);
`;

function App() {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<Tours />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Content>
      <Footer />
    </>
  );
}

export default App;

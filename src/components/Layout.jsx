import { Suspense } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer.jsx";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        // margin: "0 auto",
        // padding: "0 16px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <main style={{ flexGrow: 2 }}>
        <Container>
          <Suspense fallback={null}>{children}</Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

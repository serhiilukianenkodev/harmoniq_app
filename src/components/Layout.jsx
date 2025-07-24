import { Suspense } from "react";
import AppBar from "./AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div style={{ margin: "0 auto", padding: "0 16px" }}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;

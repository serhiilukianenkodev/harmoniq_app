import { Suspense } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer.jsx';
import Container from './Container/Container.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Suspense fallback={null}>{children}</Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

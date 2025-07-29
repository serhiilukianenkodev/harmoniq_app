import React from 'react';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import PopularArticlesSection from '../../components/PopularArticlesSection/PopularArticlesSection.jsx';

export default function HomePage() {
  return (
    <>
      <div>
        <h1>Welcome to the Harmoniq App!</h1>
      </div>
      <AboutUs />
      <PopularArticlesSection />
    </>
  );
}

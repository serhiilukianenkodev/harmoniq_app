import React from 'react';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import PopularArticlesSection from '../../components/PopularArticlesSection/PopularArticlesSection.jsx';
import Hero from '../../components/Hero/Hero';
import Creators from '../../components/Creators/Creators/Creators.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <PopularArticlesSection />
      <Creators />
    </>
  );
}

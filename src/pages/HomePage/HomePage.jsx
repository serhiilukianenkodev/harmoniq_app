import React from "react";
import Hero from '../../components/Hero/Hero';
import Creators from '../../components/Creators/Creators';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';



export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Creators />
    </>
  );
}

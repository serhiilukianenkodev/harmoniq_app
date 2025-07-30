import React from "react";
import Creators from '../../components/Creators/Creators';
import AboutUs from "../../components/AboutUs/AboutUs.jsx";

export default function HomePage() {
  return (
    <>
      <div>
        <h1>Welcome to the Harmoniq App!</h1>
      </div>
      <AboutUs />
      <Creators />
    </>
  );
}

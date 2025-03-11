

// Home.jsx
import React from 'react';
import Hero from './Hero';
import WhyMoodBloom from './WhyMoodBloom';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

import "./Home.css";


export default function Home() {
  return (
    <div className="home-container">
      <Hero />
      {/* <TrackMoodButton/> */}
      <WhyMoodBloom />
      <HowItWorks />
      <Testimonials />
   
      {/* <CallToAction /> */}
     
    </div>
  );
}








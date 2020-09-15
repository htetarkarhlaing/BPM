import React from 'react'
import HeroSection from '../../HeroSection';
import Pricing from '../../Pricing';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './data';

function Home() {
    return (
        <>
            <HeroSection {...homeObjOne} />
            <Pricing />
            <HeroSection {...homeObjThree} />
            <HeroSection {...homeObjTwo} />
            
            <HeroSection {...homeObjFour} />
            <Pricing />
        </>
    )
}

export default Home;

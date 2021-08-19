import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import InfoCard from './InfoCard';

// export async function getStaticProps()
// {
//   const res = await fetch('http://localhost:1337/annonces')
//   const data = await res.json()
//   console.log(data);
//   return {
//     props: {
//       data
//     }, 
//   }
// }
export default function SimpleSlider({data}) {
    

    const settings = {
     // dots: true,
      autoplay: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      
    };
    
    return (
      <div>
        {/* <Slider w={'100%'} {...settings}  > */}
        <InfoCard data={data} />
            {/* <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard /> */}
        {/* </Slider> */}
      </div>
    );

  
  
} 

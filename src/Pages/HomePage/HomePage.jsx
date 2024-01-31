import React from "react";
import Banner from "../../Components/Banner/Banner";
import img from "../../assets/images/images.jpeg";
const HomePage = () => {
  return (
    <div className="  text-center ">
      <div className="container grid grid-cols-5 gap-4 items-start justify-center mt-28">
        <div className="">
          <h1 className=" uppercase ">indulge in Decadence</h1>
          <p>Project 4</p>
          <p>residential . place 4</p>
        </div>
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <img src={img} alt="" />
        </div>
      </div>

      <div>
        <Banner />
      </div>
    </div>
  );
};

export default HomePage;

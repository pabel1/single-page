import React from "react";
import { MdFavoriteBorder } from "react-icons/md";

const ImageCard = ({ data }) => {
  return (
    <div className="w-full relative  ">
      <img src={data?.full_path} alt="" className=" w-full h-[450px]  " />
      <div className=" absolute bottom-4 px-4 py-4 w-full bg-black  bg-opacity-80 text-white flex flex-col items-start bg-opa justify-between">
        <h1>Project</h1>
        <p>phase 4</p>
      </div>
      <div className=" p-2 rounded-full ring-1 ring-white absolute top-4 right-4 ">
        <MdFavoriteBorder className=" text-lg text-white" />
      </div>
    </div>
  );
};

export default ImageCard;

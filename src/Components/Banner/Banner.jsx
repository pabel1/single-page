import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllProjectQuery } from "../../feature/ApiSlice/apiSlice";
import ImageCard from "../Card/ImageCard";

const Banner = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };
  const { data, isLoading, isSuccess, isError } = useGetAllProjectQuery() || {};

  let content = null;

  if (!isLoading && isSuccess && !isError) {
    const { featured_project } = data || {};

    content = (
      <>
        <div className="relative px-4 my-8">
          <div
            onClick={prevHandler}
            className="hidden  cursor-pointer group-hover:block  absolute  left-[-100%] group-hover:left-[2.5%] top-[50%] translate-y-[-50%] z-[100] rounded-full p-3 bg-gray-50 shadow-lg shadow-gray-400"
          >
            <MdArrowForwardIos
              size={20}
              className="rotate-180 cursor-pointer text-primaryColor"
            />
          </div>
          <Swiper
            slidesPerView={1.2}
            spaceBetween={8}
            loop={true}
            autoplay={{ delay: 5000 }}
            className="mySwiper p-2"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 1.2,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              920: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {featured_project &&
              featured_project?.map((item) => (
                <SwiperSlide key={item?.data?.images?.list[0]?.id}>
                  <ImageCard data={item?.data?.images?.list[0]} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            onClick={nextHandler}
            className="hidden cursor-pointer  group-hover:block absolute right-[-100%] group-hover:right-[2.5%] top-[50%] translate-y-[-50%] z-[100] rounded-full p-3 bg-gray-50 shadow-lg shadow-gray-400"
          >
            <MdArrowForwardIos size={20} className=" text-primaryColor" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-[#1882d9] py-10">
      <div className="flex justify-between items-center">
        <div className="">
          <button>Next</button>
        </div>
        <div className="container text-white flex flex-col items-center justify-center py-5 px-10">
          <h1 className="uppercase text-2xl">Overview</h1>
          <p className="text-left my-6 w-[60%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati
            quo neque sunt repellat odit error aliquid totam earum mollitia
            deserunt eius quam cumque expedita quisquam reprehenderit, nostrum
            sit, laboriosam sapiente? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Reiciendis laudantium beatae obcaecati accusamus
            sapiente illum quia eaque nemo, sunt ipsa deleniti accusantium
            recusandae repellat dolore suscipit deserunt culpa atque at.
          </p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Banner;

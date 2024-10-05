import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
const Reviews: React.FC = () => {
  const Testmonials = [
    {
      userName: "Emily Johnson",
      userImageUrl: "/rev (1).jpg",
      testimonial:
        "The tailored adventure planning was a game-changer! I never thought my dream trip could be so perfectly aligned with my interests. Every detail was seamless and stress-free.",
    },
    {
      userName: "Michael Davis",
      userImageUrl: "/rev (2).jpg",
      testimonial:
        "This platform made planning with my friends so easy! We discovered new places, had amazing experiences, and everything was personalized for our group.",
    },
    {
      userName: "Sarah Lee",
      userImageUrl: "/rev (3).jpg",
      testimonial:
        "Planning my solo getaway was such a breeze. I loved how every activity felt like it was chosen just for me. The perfect balance of relaxation and adventure!",
    },
  ];
  return (
    <>
      <div className="font-intra p-5 mt-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-center leading-none text-[2em] font-extrabold xl:text-[3em]">
            Don't Just Take Our Word for It
          </h1>
          <p className="text-center text-xs xl:text-base w-3/4  text-[#616161]">
            Discover how Experience finder has revolutionized the way our users
            explore the world. From seamless planning to unforgettable,
            personalized adventures, hear their stories and see the difference
            for yourself.
          </p>
        </div>
        {/* slider */}
        <div className="max-w-4xl mx-auto mt-10 lg:hidden">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              400: { slidesPerView: 1.15 },
              639: { slidesPerView: 1.15 },
              865: { slidesPerView: 1.15 },
              1000: { slidesPerView: 1.15 },
              1500: { slidesPerView: 1.15 },
              1700: { slidesPerView: 1.15 },
            }}
            navigation
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="w-full "
          >
            <div className="object-cover flex justify-center items-center">
              {Testmonials.map((items, i) => (
                <SwiperSlide
                  key={i}
                  className="h-[320px] md:text-xl md:p-10 rounded-2xl flex flex-col justify-start items-center bg-[#ECEBEB]  pt-5 flex-wrap"
                >
                  <p className="p-2 text-base tracking-tight font-light mt-5 text-center">
                    {items.testimonial}
                  </p>
                  <div className="flex justify-start items-center mt-10 gap-5">
                    {/* <img
                        src={items.userImageUrl}
                        alt=""
                        className="rounded-full h-[46px] w-[47px]"
                      /> */}
                    <div className="flex flex-col justify-start items-start">
                      <h1>{items.userName}</h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
      {/* card */}
      <div className="xl:block hidden mt-6">
        <div className="grid grid-cols-3 place-items-center">
        {Testmonials.map((items, i) => {
          return (
            <div key={i} className="border w-[390px] p-5 rounded-2xl flex flex-col justify-center items-center gap-5">
              <h1>{items.testimonial}</h1>
              <div className="flex justify-center items-center gap-4 ">
                <img src={items.userImageUrl} alt="" className="bg-cover bg-center rounded-full bg-no-repeat h-[40px] w-[40px]" />
              <p>{items.userName}</p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      <div className="flex justify-center items-center pointer-events-none">
        <img src="/websitess.jpg" alt="" />
      </div>
    </>
  );
};
export default Reviews;

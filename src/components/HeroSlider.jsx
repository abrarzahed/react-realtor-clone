import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebasee";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

export default function HeroSlider() {
  const [listings, setListings] = useState([]);
  const [isSpinning, setIsSpinning] = useState(true);

  const navigation = useNavigate();

  const handleNavigate = (e, path) => {
    navigation(path);
  };

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const listingsSnap = await getDocs(q);

      SwiperCore.use([Autoplay, Navigation, Pagination]);

      const tempListings = [];
      listingsSnap.forEach((doc) => {
        return tempListings.push({ id: doc.id, data: doc.data() });
      });

      setListings(tempListings);

      setIsSpinning(false);
    };
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSpinning) {
    return <Spinner />;
  }
  if (listings.length <= 0) {
    return <></>;
  }
  return (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ type: "progressbar" }}
      effect="fade"
      modules={[EffectFade]}
      autoplay={{ delay: 6000 }}
    >
      {listings.map(({ data, id }) => (
        <SwiperSlide
          key={id}
          onClick={(e) => handleNavigate(e, `/category/${data.type}/${id}`)}
        >
          <div
            style={{
              backgroundImage: `linear-gradient(
                -45deg,
                rgba(0,0,0, 0.3),
                rgba(0,0,0, .8)
              ), url(${data.imageUrls})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-[300px] md:h-[60vh] overflow-hidden relative cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="brand-info absolute  w-[75%] md:w-[50%] flex flex-col space-y-5 top-[42%] lg:top-[43.5%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-auto p-3 z-40"
            >
              <h1 className="text-xl text-white font-bold md:text-4xl uppercase text-center">
                <span className="text-red-600">Real</span>tor.Clone
              </h1>
              <div className="flex bg-white rounded">
                <input
                  type="text"
                  className=" w-full p-3 bg-transparent border-none"
                  placeholder="Search"
                />
                <button className="py-3 px-5 bg-gray-200 rounded-tr rounded-br">
                  <FiSearch />
                </button>
              </div>
            </div>

            <div className="max-w-6xl h-full mx-auto relative px-3">
              <p className="text-white text-md md:text-xl font-medium shadow-lg bg-cyan-600 absolute top-0 left-3 p-3  border-b-4 border-white">
                {data.name}
              </p>
              <p
                className={`text-white text-md md:text-xl font-medium shadow-lg absolute bottom-0 right-3 p-3  border-t-4 border-white uppercase ${
                  data.offer ? "bg-green-700" : "bg-orange-600"
                }`}
              >
                Cost: $
                {data.offer
                  ? data.discountPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : data.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" ? " / month" : ""}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

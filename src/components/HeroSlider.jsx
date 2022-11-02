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

export default function HeroSlider() {
  const [listings, setListings] = useState([]);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const listingsSnap = await getDocs(q);

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
    <>
      {listings.map((listing) => {
        return <h1 key={listing.id}>{listing.data.name}</h1>;
      })}
    </>
  );
}

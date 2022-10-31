import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
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
import { FaShare } from "react-icons/fa";
import ListingInfo from "../components/ListingInfo";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({ ...docSnap.data() });
        setIsSpinning(false);
      }
    };
    fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (isSpinning) {
    return <Spinner />;
  }

  const handleCopy = () => {
    setShareLinkCopied(true);
    navigator.clipboard.writeText(window.location.href);

    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative overflow-hidden h-[200px] md:h-[400px]"
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={handleCopy}
        className="fixed top-[13%] right-[3%] z-10 bg-cyan-500 text-white text-2xl shadow-md p-3 rounded-full cursor-pointer"
      >
        <FaShare />
      </div>

      {shareLinkCopied && (
        <div className="fixed top-[16%] right-[3%] z-10 bg-cyan-500 mt-5 text-white text-xl py-1 px-2 rounded">
          Link copied
        </div>
      )}

      <ListingInfo listing={listing} />
    </main>
  );
}

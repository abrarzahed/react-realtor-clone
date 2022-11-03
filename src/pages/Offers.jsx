import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import BigTitle from "../components/BigTitle";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebasee";

export default function Offers() {
  const [isSpinning, setIsSpinning] = useState(true);
  const [offersListing, setOffersListing] = useState([]);
  const [lastListing, setLastListing] = useState(null);

  useEffect(() => {
    const fetchOffersListing = async () => {
      try {
        // reference
        const offersListingRef = collection(db, "listings");
        // conditional query
        const q = query(
          offersListingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const tempListing = [];
        // execute query
        const offersListingSnap = await getDocs(q);

        // track last visible listing
        const lastVisibleListing =
          offersListingSnap.docs[offersListingSnap.docs.length - 1];

        setLastListing(lastVisibleListing);

        offersListingSnap.forEach((doc) => {
          return tempListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOffersListing(tempListing);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsSpinning(false);
      }
    };
    fetchOffersListing();
  }, []);

  // increase limit function
  const fetchMoreListing = async () => {
    setIsSpinning(true);
    try {
      // reference
      const offersListingRef = collection(db, "listings");
      // conditional query
      const q = query(
        offersListingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastListing),
        limit(1)
      );

      const tempListing = [];
      // execute query
      const offersListingSnap = await getDocs(q);

      // track last visible listing
      const lastVisibleListing =
        offersListingSnap.docs[offersListingSnap.docs.length - 1];

      setLastListing(lastVisibleListing);

      offersListingSnap.forEach((doc) => {
        return tempListing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setOffersListing((prev) => [...prev, ...tempListing]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSpinning(false);
    }
  };

  if (isSpinning) {
    return <Spinner />;
  }
  if (offersListing.length <= 0) {
    return (
      <div>
        <h1 className="mt-6 text-2xl text-red-600 text-center">
          There are no offers currently available
        </h1>
      </div>
    );
  }
  return (
    <main className="max-w-6xl mx-auto mt-10 mb-6 px-3">
      <BigTitle title="Offers" />
      <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6  sm:space-x-5 space-y-5 sm:space-y-0">
        {offersListing.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} data={listing.data} />
        ))}
      </ul>
      {lastListing && (
        <button
          onClick={fetchMoreListing}
          className="p-2  block mt-8 text-white text-sm font-semibold bg-red-600 uppercase rounded shadow-xl text-center"
        >
          Load More
        </button>
      )}
    </main>
  );
}

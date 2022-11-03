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
import { useParams } from "react-router";
import BigTitle from "../components/BigTitle";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebasee";

export default function Category() {
  const [isSpinning, setIsSpinning] = useState(true);
  const [categoryListing, setCategoryListing] = useState([]);
  const [lastListing, setLastListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchCategoryListing = async () => {
      try {
        // reference
        const categoryListingRef = collection(db, "listings");
        // conditional query
        const q = query(
          categoryListingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );

        const tempListing = [];
        // execute query
        const categoryListingSnap = await getDocs(q);

        // track last visible listing
        const lastVisibleListing =
          categoryListingSnap.docs[categoryListingSnap.docs.length - 1];

        setLastListing(lastVisibleListing);

        categoryListingSnap.forEach((doc) => {
          return tempListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setCategoryListing(tempListing);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsSpinning(false);
      }
    };
    fetchCategoryListing();
  }, [params.categoryName]);

  // increase limit function
  const fetchMoreListing = async () => {
    setIsSpinning(true);
    try {
      // reference
      const categoryListingRef = collection(db, "listings");
      // conditional query
      const q = query(
        categoryListingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastListing),
        limit(4)
      );

      const tempListing = [];
      // execute query
      const categoryListingSnap = await getDocs(q);

      // track last visible listing
      const lastVisibleListing =
        categoryListingSnap.docs[categoryListingSnap.docs.length - 1];

      setLastListing(lastVisibleListing);

      categoryListingSnap.forEach((doc) => {
        return tempListing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setCategoryListing((prev) => [...prev, ...tempListing]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSpinning(false);
    }
  };

  if (isSpinning) {
    return <Spinner />;
  }
  if (categoryListing.length <= 0) {
    return (
      <div>
        <h1 className="mt-6 text-2xl text-red-600 text-center">
          There are no {params.categoryName} currently available
        </h1>
      </div>
    );
  }
  return (
    <main className="max-w-6xl mx-auto mt-10 mb-6 px-3">
      <BigTitle title={`Properties in ${params.categoryName}`} />
      <ul className="sm:grid mt-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryListing.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} data={listing.data} />
        ))}
      </ul>
      {lastListing && (
        <button
          onClick={fetchMoreListing}
          className="p-2 ml-3 block mt-6 text-white text-sm font-semibold bg-red-600 uppercase rounded shadow-xl text-center"
        >
          Load More
        </button>
      )}
    </main>
  );
}

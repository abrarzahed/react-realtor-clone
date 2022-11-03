import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BigTitle from "../components/BigTitle";
import HeroSlider from "../components/HeroSlider";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../firebasee";

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(true);
  // Offers ======================================
  const [offersListing, setOffersListing] = useState([]);
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
          limit(4)
        );

        const tempListing = [];
        // execute query
        const offersListingSnap = await getDocs(q);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rents ==========================================
  const [rentsListing, setRentsListing] = useState([]);
  useEffect(() => {
    const fetchRentsListing = async () => {
      try {
        // reference
        const rentsListingRef = collection(db, "listings");
        // conditional query
        const q = query(
          rentsListingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        const tempListing = [];
        // execute query
        const rentsListingSnap = await getDocs(q);
        rentsListingSnap.forEach((doc) => {
          return tempListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRentsListing(tempListing);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsSpinning(false);
      }
    };
    fetchRentsListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sale ==========================================
  const [salesListing, setSalesListing] = useState([]);
  useEffect(() => {
    const fetchSalesListing = async () => {
      try {
        // reference
        const salesListingRef = collection(db, "listings");
        // conditional query
        const q = query(
          salesListingRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        const tempListing = [];
        // execute query
        const salesListingSnap = await getDocs(q);
        salesListingSnap.forEach((doc) => {
          return tempListing.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setSalesListing(tempListing);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsSpinning(false);
      }
    };
    fetchSalesListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSpinning) {
    return <Spinner />;
  }
  return (
    <>
      <HeroSlider />
      <div className="max-w-6xl mx-auto mt-16 mb-6 px-3 flex flex-col space-y-14">
        {/* offer places */}
        {offersListing && offersListing.length > 0 && (
          <div>
            <BigTitle className="" title="Recent Offers" />
            <Link to="/offers" className="text-blue-400">
              <p className="ml-3 mb-2">Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offersListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}

        {/* rent places */}
        {rentsListing && rentsListing.length > 0 && (
          <div>
            <BigTitle title="Properties in rent" />
            <Link to="/category/rent" className="text-blue-400">
              <p className="ml-3 mb-2">Show more places for rent</p>
            </Link>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentsListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}

        {/* sale places */}
        {salesListing && salesListing.length > 0 && (
          <div>
            <BigTitle title="Properties in sale" />
            <Link to="/category/sale" className="text-blue-400">
              <p className="ml-3 mb-2">Show more places for sale</p>
            </Link>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {salesListing.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  data={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

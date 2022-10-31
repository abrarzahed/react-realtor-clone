import { useNavigate } from "react-router";
import ListingItem from "./ListingItem";
import { db } from "../firebasee";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function MyListings(props) {
  // navigation
  const navigate = useNavigate();

  // delete listing
  const deleteListing = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      await deleteDoc(doc(db, "listings", id));

      toast.success("Listing has been deleted");
    }
  };

  // edit listing
  const editListing = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  if (!props.listings) {
    return (
      <h2 className="text-center text-2xl">Listings are being loaded... </h2>
    );
  }
  return (
    <div className="px-3 my-5 mx-auto">
      <h2 className="text-2xl text-center text-cyan-800 font-bold">
        My Listings
      </h2>

      <ul className="mt-8  sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:space-x-5  space-y-5 sm:space-y-0">
        {props.listings.map((listing) => (
          <ListingItem
            key={listing.id}
            id={listing.id}
            data={listing.data}
            onDelete={() => deleteListing(listing.id)}
            onEdit={() => editListing(listing.id)}
          />
        ))}
      </ul>
    </div>
  );
}

import ListingItem from "./ListingItem";
export default function MyListings(props) {
  if (!props.listings) {
    return <h2>Loading Listings... </h2>;
  }
  return (
    <div className="px-3 mt-10 mx-auto">
      <h2 className="text-2xl text-center text-cyan-800 font-bold">
        My Listings
      </h2>

      <ul className="mt-5 sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {props.listings.map((listing) => (
          <ListingItem key={listing.id} id={listing.id} data={listing.data} />
        ))}
      </ul>
    </div>
  );
}

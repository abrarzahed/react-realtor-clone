export default function ListingItem(props) {
  return (
    <li>
      <h1>{props.id}</h1>
      <p>{props.data.address}</p>
    </li>
  );
}

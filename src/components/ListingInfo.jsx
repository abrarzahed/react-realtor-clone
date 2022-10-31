import { AiFillCar } from "react-icons/ai";
import { FaBath, FaCheckDouble, FaMapMarkedAlt } from "react-icons/fa";
import { GiBed } from "react-icons/gi";

export default function ListingInfo(props) {
  const {
    name,
    offer,
    discountedPrice,
    regularPrice,
    type,
    address,
    description,
    bedrooms,
    bathrooms,
    isFurnished,
    parkingSpot,
  } = props.listing;
  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto my-8 rounded shadow-md md:space-x-10 md:space-y-0 space-y-8  bg-white flex flex-col md:flex-row">
      <div className="w-full flex flex-col justify-center space-y-3">
        <h3 className="text-3xl text-gray-700 font-medium">{name}</h3>
        <p className="text-xl font-bold text-cyan-600">
          $
          {offer
            ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          {type === "rent" ? " / Month" : ""}
        </p>

        <div className="flex space-x-3 items-center">
          <FaMapMarkedAlt className="text-red-500 text-2xl" />
          <p className="font-medium text-lg text-gray-700 uppercase">
            {address}
          </p>
        </div>

        {offer && (
          <div className="p-3 bg-green-100 rounded text-red-600 text-center text-2xl">
            $
            {(+regularPrice - +discountedPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            discount
          </div>
        )}

        <p className="text-md">
          <span className="font-bold text-gray-700 ">Description</span> -{" "}
          {description}
        </p>

        <ul className="flex space-x-6 items-center">
          <li className="flex items-center space-x-2">
            <GiBed className="text-2xl text-blue-600" />
            <p className="text-md text-gray-600 font-semibold">
              {bedrooms > 1 ? `${bedrooms} Beds` : `${bedrooms} Bed`}
            </p>
          </li>

          <li className="flex items-center space-x-2">
            <FaBath className="text-xl text-blue-600" />
            <p className="text-md text-gray-600 font-semibold">
              {bathrooms > 1 ? `${bathrooms} Baths` : `${bathrooms} Bath`}
            </p>
          </li>

          {parkingSpot && (
            <li className="flex items-center space-x-2">
              <AiFillCar className="text-xl text-blue-600" />
              <p className="text-md text-gray-600 font-semibold">
                Parking Spot
              </p>
            </li>
          )}

          {isFurnished && (
            <li className="flex items-center space-x-2">
              <FaCheckDouble className="text-xl text-blue-600" />
              <p className="text-md text-gray-600 font-semibold">Furnished</p>
            </li>
          )}
        </ul>
      </div>
      <div className="bg-blue-300 min-h-[220px] w-full overflow-hidden">
        Right
      </div>
    </div>
  );
}

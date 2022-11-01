import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { FaBath, FaCheckDouble, FaMapMarkedAlt } from "react-icons/fa";
import { GiBed } from "react-icons/gi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
import { db } from "../firebasee";

export default function ListingInfo(props) {
  const auth = getAuth();

  const [landLordContactVisibility, setLandLordContactVisibility] =
    useState(false);
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const {
    name,
    offer,
    discountPrice,
    regularPrice,
    type,
    address,
    description,
    bedrooms,
    bathrooms,
    isFurnished,
    parkingSpot,
    userRef,
    latitude,
    longitude,
    imageUrls,
  } = props.listing;

  // send message to land lord
  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get land lord data");
      }
    };
    getLandLord();
  }, [userRef]);

  // handle input change
  const handleInputChange = (e) => {
    // e.preventDefault();
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <div className="p-5 md:p-8 max-w-6xl mx-auto my-12 rounded shadow-md md:space-x-10 md:space-y-0 space-y-8 bg-white flex flex-col md:flex-row">
      <div className="w-full flex flex-col justify-center space-y-4">
        <h3 className="text-3xl text-gray-600 font-medium">{name}</h3>
        <p className="text-xl bg-cyan-600 bg-opacity-10 p-3 font-bold text-cyan-600">
          $
          {offer
            ? discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          {type === "rent" ? " / month" : ""}
        </p>

        <div className="flex space-x-3 items-center">
          <FaMapMarkedAlt className="text-red-500 text-2xl" />
          <p className="font-medium text-md text-gray-700 uppercase">
            {address}
          </p>
        </div>

        {offer && (
          <div className="p-3 bg-green-600 bg-opacity-10 text-green-600 text-xl font-bold">
            ${+regularPrice - +discountPrice} discount
          </div>
        )}

        <p className="text-md">
          <span className="font-bold text-gray-700 ">Description</span> -{" "}
          {description}
        </p>

        <ul className="flex space-x-4 space-y-2 md:space-y-0 md:space-x-6  bg-blue-500 bg-opacity-20 p-3 items-center flex-wrap">
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

        {userRef !== auth?.currentUser?.uid && (
          <div className="flex flex-col space-y-4">
            {!landLordContactVisibility && (
              <button
                onClick={() => setLandLordContactVisibility(true)}
                className="p-3 w-full transition duration-200 text-sm bg-blue-500 rounded text-white uppercase font-medium shadow-md focus:bg-blue-800"
              >
                Contact Landlord
              </button>
            )}
            {landLordContactVisibility && (
              <form>
                <p className="text-md text-gray-500 font-medium">
                  Contact {landLord?.name} for "{name}"
                </p>
                <textarea
                  rows="2"
                  name="message"
                  className="w-full border transition duration-150 ease-in-out py-2 px-3 text-lg text-gray-700 text-md border-cyan-500 rounded mt-2 focus:bg-blue-50"
                  placeholder="Message"
                  value={message}
                  onChange={handleInputChange}
                ></textarea>
                <a
                  href={`mailto:${landLord?.email}?Subject=${name}&body=${message}`}
                  className="block w-full mt-2  transition duration-200 text-sm bg-blue-500 rounded text-white uppercase font-medium shadow-md focus:bg-blue-800"
                >
                  <p
                    onClick={() => {
                      setLandLordContactVisibility(false);
                      setMessage("");
                    }}
                    className="inline-block p-3  w-full text-center"
                  >
                    Send Message
                  </p>
                </a>
              </form>
            )}
          </div>
        )}
      </div>
      <div className="h-[300px] md:h-auto  border-2 border-[#F0F7FC] rounded w-full">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latitude, longitude]}>
            <Popup>
              <p className="truncate">{name}</p>
              <p>{address}</p>
              <img className="rounded-2xl" src={`${imageUrls[0]}`} alt="" />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

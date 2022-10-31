import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";
import { GiBed } from "react-icons/gi";
import { FaBath } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function ListingItem({ id, data, onDelete, onEdit }) {
  return (
    <li className="relative bg-white overflow-hidden transition-shadow duration-150 shadow-md hover:shadow-2xl flex flex-col rounded ">
      <Link to={`/category/${data.type}/${id}`}>
        <div className="overflow-hidden rounded-t-md h-[170px]">
          <img
            className="w-full transition-scale duration-200 ease-in object-cover hover:scale-110"
            loading="lazy"
            src={data.imageUrls[0]}
            alt=""
          />
        </div>
        <Moment
          className="absolute rounded top-3 left-3 bg-cyan-600 py-1 px-2 text-md shadow-lg font-semibold text-white"
          fromNow
        >
          {data?.timestamp?.toDate()}
        </Moment>
        <div className="p-3">
          <div className="flex space-x-1 items-center mb-2">
            <MdLocationOn className="text-2xl text-cyan-600" />
            <p className="text-sm text-gray-600 truncate">{data.address}</p>
          </div>

          <p className="font-semibold text-xl mb-2 truncate text-cyan-800">
            {data.name}
          </p>

          <p className="text-gray-800 font-bold text-md mb-2">
            $
            {data.offer
              ? data.discountPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : data.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {data.type === "rent" && " / Month"}
          </p>
          <div className="flex items-center space-x-6 mb-1">
            <div className="flex items-center space-x-2">
              <GiBed className="text-xl text-blue-600" />
              <p className="text-sm text-gray-600 font-semibold">
                {data.bedrooms > 1
                  ? `${data.bedrooms} Beds`
                  : `${data.bedrooms} Bed`}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaBath className="text-lg text-blue-600" />
              <p className="text-sm text-gray-600 font-semibold">
                {data.bathrooms > 1
                  ? `${data.bathrooms} Baths`
                  : `${data.bathrooms} Bath`}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-3 right-3  text-xl cursor-pointer text-red-500"
          onClick={onDelete}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-[11px] right-9  text-2xl cursor-pointer text-gray-600"
          onClick={onEdit}
        />
      )}
    </li>
  );
}

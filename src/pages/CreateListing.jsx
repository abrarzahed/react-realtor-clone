import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 2,
    bathrooms: 1,
    parkingSpot: true,
    isFurnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: "",
    discountPrice: "",
  });

  const onFieldsChange = () => {};

  return (
    <main className="px-4 my-8">
      <div className="bg-white p-4 md:p-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl border-b-2 pb-[14px] mb-6 font-bold text-gray-800">
          Create a Listing
        </h1>
        <form id="form">
          {/* ============ Sell or Rent ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Sell / Rent
            </p>
            <div className="flex space-x-8 items-center">
              <button
                name="sell"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  formData.type === "sell"
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                Sell
              </button>
              <button
                name="rent"
                type="button"
                className={`w-full border border-blue-300  rounded p-3 text-xl font-semibold ${
                  formData.type === "rent"
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* ============ name ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">Name</p>
            <input
              name="name"
              value={formData.name}
              minLength="10"
              maxLength="32"
              type="text"
              placeholder="Name"
              className="w-full rounded py-4 border border-blue-400 font-semibold"
              required
              onChange={onFieldsChange}
            />
          </div>

          {/* ============ bedrooms / bathrooms ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Bedrooms / Bathrooms
            </p>
            <div className="flex space-x-8 items-center">
              <input
                name="bedrooms"
                value={formData.bedrooms}
                type="number"
                placeholder="4"
                className="w-full rounded py-[14px] border border-blue-400 text-center text-xl font-semibold"
                onChange={onFieldsChange}
                required
              />
              <input
                name="bathrooms"
                value={formData.bathrooms}
                placeholder="2"
                type="number"
                className="w-full rounded py-[14px] border border-blue-400 text-center text-xl font-semibold"
                onChange={onFieldsChange}
                required
              />
            </div>
          </div>

          {/* ============ parking spot ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Parking Spot
            </p>
            <div className="flex space-x-8 items-center">
              <button
                name="parkingSpot"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  formData.parkingSpot
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                Yes
              </button>
              <button
                name="parkingSpot"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  !formData.parkingSpot
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ============ furnished ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Furnished
            </p>
            <div className="flex space-x-8 items-center">
              <button
                name="isFurnished"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  formData.isFurnished
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                Yes
              </button>
              <button
                name="isFurnished"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  !formData.isFurnished
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ============ address ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">Address</p>
            <textarea
              name="address"
              value={formData.address}
              type="text"
              placeholder="Address"
              className="w-full rounded py-3 border border-blue-400 font-semibold"
              required
              onChange={onFieldsChange}
            ></textarea>
          </div>

          {/* ============ description ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Description
            </p>
            <textarea
              name="description"
              value={formData.description}
              type="text"
              placeholder="Description"
              className="w-full rounded py-3 border border-blue-400 font-semibold"
              required
              onChange={onFieldsChange}
            ></textarea>
          </div>

          {/* ============ offer ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">Offer</p>
            <div className="flex space-x-8 items-center">
              <button
                name="offer"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  formData.offer
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                Yes
              </button>
              <button
                name="offer"
                type="button"
                className={`w-full border  border-blue-300 rounded p-3 text-xl font-semibold ${
                  !formData.offer
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-600"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* ============ regular price / discount price ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Regular Price ($) / Discount Price ($)
            </p>
            <div className="flex space-x-8 items-center">
              <input
                name="regularPrice"
                value={formData.regularPrice}
                type="number"
                className="w-full rounded py-[14px] border border-blue-400 text-center text-xl font-semibold"
                onChange={onFieldsChange}
                required
              />
              <input
                disabled={!formData.offer}
                name="discountPrice"
                value={formData.discountPrice}
                type="number"
                className="w-full rounded py-[14px] border border-blue-400 text-center text-xl font-semibold disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-none"
                onChange={onFieldsChange}
                required={formData.offer}
              />
            </div>
          </div>

          {/* ============ images ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold text-lg text-gray-700">Images</p>
            <p className="mb-3 text-sm">
              The first image will be cover (maximum 6 image)
            </p>
            <div className="flex space-x-8 items-center">
              <input
                name="images"
                value={formData.regularPrice}
                type="file"
                className="w-full rounded px-[14px] py-[14px] border border-blue-400 text-center font-semibold"
                onChange={onFieldsChange}
                accept=".jpg,.jpeg,.png,.svg"
                required
                multiple
                max="6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 w-full rounded text-white p-4 shadow-sm uppercase text-md font-medium hover:bg-red-700 transition duration-250 disabled:bg-gray-200 disabled:cursor-none"
          >
            Create Listing
          </button>
        </form>
      </div>
    </main>
  );
}

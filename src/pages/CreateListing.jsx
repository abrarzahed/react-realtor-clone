import { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "sell",
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
    images: {},
  });

  const onFieldsChange = (e, fieldValue) => {
    e.preventDefault();
    const { name, type, value, files } = e.target;

    console.log(files);

    if (type === "button") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: fieldValue,
        };
      });
    }

    if (type === "text" || type === "textarea" || type === "number") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }

    if (type === "file") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: files,
        };
      });
    }
  };

  return (
    <main className="px-4 my-8">
      <div className="bg-white p-4 md:p-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl border-b-2 pb-[14px] mb-6 font-bold text-gray-800">
          Create a Listing
        </h1>
        <form>
          {/* ============ Sell or Rent ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Sell / Rent
            </p>
            <div className="flex space-x-8 items-center">
              <button
                onClick={(e) => onFieldsChange(e, "sell")}
                name="type"
                type="button"
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  formData.type === "sell"
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
              >
                Sell
              </button>
              <button
                onClick={(e) => onFieldsChange(e, "rent")}
                name="type"
                type="button"
                className={`w-full border border-cyan-300  rounded p-3 text-xl font-semibold ${
                  formData.type === "rent"
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
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
              className="w-full rounded py-4 border border-cyan-400 focus:border-cyan-300 font-semibold"
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
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold"
                onChange={onFieldsChange}
                required
              />
              <input
                name="bathrooms"
                value={formData.bathrooms}
                placeholder="2"
                type="number"
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold"
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
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  formData.parkingSpot
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, true)}
              >
                Yes
              </button>
              <button
                name="parkingSpot"
                type="button"
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  !formData.parkingSpot
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, false)}
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
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  formData.isFurnished
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, true)}
              >
                Yes
              </button>
              <button
                name="isFurnished"
                type="button"
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  !formData.isFurnished
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, false)}
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
              className="w-full rounded py-3 border border-cyan-400 focus:border-cyan-300 font-semibold"
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
              className="w-full rounded py-3 border border-cyan-400 focus:border-cyan-300 font-semibold"
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
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  formData.offer
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, true)}
              >
                Yes
              </button>
              <button
                name="offer"
                type="button"
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  !formData.offer
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
                onClick={(e) => onFieldsChange(e, false)}
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
                placeholder="1000"
                value={formData.regularPrice}
                type="number"
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold"
                onChange={onFieldsChange}
                required
              />
              <input
                placeholder={formData.offer ? "120" : ""}
                disabled={!formData.offer}
                name="discountPrice"
                value={formData.discountPrice}
                type="number"
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold disabled:bg-gray-200 disabled:border-gray-200"
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
                type="file"
                className="w-full rounded px-[14px] py-[14px] border border-cyan-400 focus:border-cyan-300 text-center font-semibold"
                onChange={(e) => onFieldsChange(e)}
                accept=".jpg,.jpeg,.png,.svg"
                required
                multiple
                maxLength="6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-900 w-full rounded text-white p-4 shadow-sm uppercase text-md font-medium hover:bg-blue-800 transition duration-250 disabled:bg-gray-200 disabled:cursor-none"
          >
            Create Listing
          </button>
        </form>
      </div>
    </main>
  );
}

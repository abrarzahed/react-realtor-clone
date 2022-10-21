export default function CreateListing() {
  return (
    <main className="px-4 mt-8">
      <div className="bg-white p-4 md:p-8 bg-opacity-50 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl border-b-2 pb-[14px] mb-6 font-bold text-gray-800">
          Create a Listing
        </h1>
        <form>
          <div className="my-6 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Sell / Rent
            </p>
            <div className="flex space-x-8 items-center">
              <button
                type="button"
                className="w-full border bg-white text-blue-600 border-blue-300 rounded p-3 text-xl font-semibold "
              >
                Sell
              </button>
              <button
                type="button"
                className="w-full border border-blue-300 bg-blue-600 rounded p-3 text-xl font-semibold  text-white"
              >
                Rent
              </button>
            </div>
          </div>

          <div className="my-6 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">Name</p>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded py-[14px] border border-blue-400"
            />
          </div>

          <div className="my-6 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Bedrooms / Bathrooms
            </p>
            <div className="flex space-x-8 items-center">
              <input
                type="number"
                placeholder="4"
                className="w-full rounded py-[14px] border border-blue-400"
              />
              <input
                placeholder="2"
                type="number"
                className="w-full rounded py-[14px] border border-blue-400"
              />
            </div>
          </div>

          <div className="my-6 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Parking Spot
            </p>
            <div className="flex space-x-8 items-center">
              <button
                type="button"
                className="w-full border bg-white text-blue-600 border-blue-300 rounded p-3 text-xl font-semibold "
              >
                Yes
              </button>
              <button
                type="button"
                className="w-full border border-blue-300 bg-blue-600 rounded p-3 text-xl font-semibold  text-white"
              >
                No
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

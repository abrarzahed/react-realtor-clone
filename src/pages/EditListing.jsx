import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

import { v4 as uuidV4 } from "uuid";
import { serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebasee";
import { useNavigate, useParams } from "react-router";

export default function CreateListing() {
  // auth
  const auth = getAuth();

  // navigate
  const navigation = useNavigate();

  // states
  const [isSpinning, setIsSpinning] = useState(false);

  const [formData, setFormData] = useState({
    type: "sale",
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
    latitude: 0,
    longitude: 0,
  });

  const [listing, setListing] = useState(null);

  const [showImageProgress, setShowImageProgress] = useState(false);
  const [progress, setProgress] = useState("0");

  //   check if the user has created this this listing
  useEffect(() => {
    if (listing && listing?.userRef !== auth.currentUser.uid) {
      toast.error("You can not edit this listing");
      navigation("/");
    }
  }, [listing, auth.currentUser.uid, navigation]);

  // get specific listing from firebase
  const params = useParams();
  useEffect(() => {
    setIsSpinning(true);
    setFormData((prev) => {
      return {
        ...prev,
        images: {},
      };
    });
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({ ...docSnap.data() });
        setFormData({ ...docSnap.data() });
      } else {
        navigation("/");
        toast.error("listing does not exist");
      }
    };
    fetchListing();
    setIsSpinning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auto input lat & long form geolocation api
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => {
          return {
            ...prev,
            latitude,
            longitude,
          };
        });
      });
    }
  }, []);

  // manage state(form data) changes
  const onFieldsChange = (e, fieldValue) => {
    e.preventDefault();
    const { name, type, value, files } = e.target;

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

  // form submit functionalities
  const onSubmit = async (e) => {
    e.preventDefault();

    // spinner enable
    setIsSpinning(true);

    // check regular price > discount price
    if (+formData.discountPrice >= +formData.regularPrice) {
      // spinner disable
      setIsSpinning(false);

      toast.error("Discount price can not be more then regular price");
      return;
    }

    // check images are <= 6 or not
    if (formData.images.length > 6) {
      // spinner disable
      setIsSpinning(false);

      toast.error("Can not upload more than 6 images");
      return;
    }

    // image upload
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidV4()}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setShowImageProgress(true);
            const imgProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(imgProgress);

            if (snapshot.state === "running") {
              setProgress(imgProgress);
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...formData.images].map((image) => storeImage(image))
    ).catch((err) => {
      toast.error("Images were not uploaded");
      return;
    });

    // copy form data to send in firebase collection
    const formDataCopy = {
      ...JSON.parse(JSON.stringify(formData)),
      imageUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    // delete unnecessary stuff
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountPrice;

    const docRef = doc(db, "listings", params.id);
    await updateDoc(docRef, formDataCopy);

    setIsSpinning(false);
    toast.success("Listing is updated");

    // redirect to home page under certain category listing
    navigation(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  return (
    <main className="px-4 my-8">
      {isSpinning && <Spinner />}
      <div className="bg-white p-4 md:p-8 rounded shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl border-b-2 pb-[14px] mb-6 font-bold text-gray-800">
          Edit Listing
        </h1>
        <form onSubmit={onSubmit}>
          {/* ============ sale or Rent ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Sale / Rent
            </p>
            <div className="flex space-x-8 items-center">
              <button
                onClick={(e) => onFieldsChange(e, "sale")}
                name="type"
                type="button"
                className={`w-full border  border-cyan-300 rounded p-3 text-xl font-semibold ${
                  formData.type === "sale"
                    ? "bg-cyan-900 text-white"
                    : "bg-white text-cyan-600"
                }`}
              >
                Sale
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
            <p className="font-semibold mb-3 text-lg text-gray-700">
              Property Name
            </p>
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

          {/* ============ geolocation ============ */}
          <div className="my-8 input-group">
            <p className="font-semibold text-lg text-gray-700">
              Latitude / Longitude
            </p>

            <p className="mb-3 text-sm">Allow location to have auto input</p>
            <div className="flex space-x-8 items-center">
              <input
                type="number"
                name="latitude"
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold"
                value={formData.latitude}
                onChange={(e) => onFieldsChange(e)}
                required
              />
              <input
                type="number"
                name="longitude"
                className="w-full rounded py-[14px] border border-cyan-400 focus:border-cyan-300 text-center text-xl font-semibold"
                value={formData.longitude}
                onChange={(e) => onFieldsChange(e)}
                required
              />
            </div>
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
              Regular Price ($) / Discounted Price ($)
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
            {showImageProgress && (
              <div className="w-full my-3 bg-gray-200 h-3 rounded-full">
                <div
                  className={`bg-cyan-400 h-full transition duration-1000 rounded-full`}
                  style={{ width: progress + "%" }}
                ></div>
              </div>
            )}
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
            Edit Listing
          </button>
        </form>
      </div>
    </main>
  );
}

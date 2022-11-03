import { FcHome } from "react-icons/fc";

export default function BigTitle({ title }) {
  return (
    <h2 className="flex mb-1 uppercase items-center space-x-3 text-xl font-bold text-gray-600">
      {" "}
      <FcHome className="text-3xl" /> <span>{title}</span>
    </h2>
  );
}

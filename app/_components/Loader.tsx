import { PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <PulseLoader color="white" size={20} loading={true} />
    </div>
  );
}

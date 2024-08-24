import { PulseLoader } from "react-spinners";

export default function Loader() {
  return (
    <div>
      <PulseLoader color="white" size={20} loading={true} />
    </div>
  );
}

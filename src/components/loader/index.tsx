import { RingLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className="flex justify-center  items-center h-full">
      <RingLoader color="green" size={200} />
    </div>
  );
}

export default LoadingSpinner;
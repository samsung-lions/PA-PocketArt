import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="bg-white w-40 h-40 rounded-lg p-4 shadow-md">
          <Skeleton height={100} />
          <Skeleton count={2} />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

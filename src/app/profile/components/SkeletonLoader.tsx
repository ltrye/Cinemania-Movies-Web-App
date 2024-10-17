import Image from "next/image";

export default function SkeletonLoader() {
  return (
    <>
      {[...Array(7)].map((el, index) => {
        return <div key={index} className="sk-save-element"></div>;
      })}
    </>
  );
}

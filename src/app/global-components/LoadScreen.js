import Image from "next/image";

export default function LoadScreen() {
  return (
    <>
      <div className="loading-img">
        <Image alt="loading" className="rotation" fill src="/loading.svg" />
      </div>
      <div className="spacer"></div>
    </>
  );
}

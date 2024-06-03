import { memo } from "react";

const Loading = memo(() => {
  return (
    <div className="flex flex-col justify-center items-center p-10 min-h-screen">
      <img
        src="/images/loading/soccerBall.webp"
        className="animate-spin h-44 w-44"
        alt="로딩 중"
      />
      <span className="text-[30px]">Loading...</span>
    </div>
  );
});

export default Loading;

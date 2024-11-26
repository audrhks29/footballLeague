import { memo } from "react";

const Loading = memo(() => {
  return (
    <section className="flex flex-col justify-center items-center p-10 min-h-screen">
      <span className="loading loading-spinner text-primary w-24"></span>
    </section>
  );
});

export default Loading;

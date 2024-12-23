import { memo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const Banner = memo(({ data }: { data: TeamInfoType }) => {
  const teamLogo = data.logos[1] ? data.logos[1] : data.logos[0];

  return (
    <div className="h-48 flex flex-col items-center justify-center border card bg-base-100">
      {data.logos ? (
        <img
          src={teamLogo.href}
          alt={data.displayName}
          title={data.displayName}
          className="w-24 "
        />
      ) : (
        <i className="text-[96px]">
          <FaRegQuestionCircle />
        </i>
      )}
      <h2 className="text-[44px] font-bold">{data.displayName}</h2>
    </div>
  );
});

export default Banner;

import { memo } from "react";
import { Link } from "react-router-dom";

const MatchInfo = memo(({ data }: { data: MatchResultDataTypes }) => {
  const date = new Date(data.header.competitions[0].date);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);

  return (
    <section>
      {/* 리그이름 */}
      {data && (
        <div>
          <h2 className="text-[26px] font-bold text-center py-4">
            {data.header.season.name}
          </h2>
        </div>
      )}

      {/* 스타디움, 일자, 관중 */}
      {data && (
        <div className="flex justify-between items-end">
          <h2 className=" text-[16px]">
            {data.gameInfo.venue.fullName}, {data.gameInfo.venue.address.city}
          </h2>
          <div className="text-right">
            <h2>{outputDateString}</h2>
            <h2 className="">
              Attendance : {data.gameInfo.attendance.toLocaleString()}
            </h2>
          </div>
        </div>
      )}

      {/* 매치 결과 */}
      {data && (
        <div className="card card-bordered mb-5">
          <div className="card-body flex-row justify-between">
            {/* 홈 팀 */}
            <Link
              to={`/teams/${data.header.league.slug}/${data.boxscore.teams[0].team.id}`}
              className="flex"
            >
              <div className="w-[500px] flex justify-center items-center">
                <span className="text-[22px]">
                  {data.boxscore.teams[0].team.displayName}
                </span>
                <img
                  src={data.boxscore.teams[0].team.logo}
                  alt={data.boxscore.teams[0].team.shortDisplayName}
                  title={data.boxscore.teams[0].team.displayName}
                  className="w-20 ml-3"
                />
              </div>
            </Link>

            {/* 스코어 */}
            <div className="w-[100px] text-center flex flex-col items-center justify-center text-[40px] font-bold">
              {data.header.competitions[0].competitors[0].score} :{" "}
              {data.header.competitions[0].competitors[1].score}
            </div>

            {/* 어웨이 팀 */}
            <Link
              to={`/teams/${data.header.league.slug}/${data.boxscore.teams[1].team.id}`}
              className="flex"
            >
              <div className="w-[500px] flex justify-center items-center">
                <img
                  src={data.boxscore.teams[1].team.logo}
                  alt={data.boxscore.teams[1].team.shortDisplayName}
                  title={data.boxscore.teams[1].team.displayName}
                  className="w-20 mr-3"
                />
                <span className="text-[22px]">
                  {data.boxscore.teams[1].team.displayName}
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
});

export default MatchInfo;

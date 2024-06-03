import { memo } from "react";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useSuspenseQueries } from "@tanstack/react-query";

import NationSelectBox from "../components/standings/NationSelectBox";
import DivisionSelectBox from "../components/standings/DivisionSelectBox";
import YearSelectBox from "../components/standings/YearSelectBox";

import { useNavigate, useParams } from "react-router-dom";

import StandingsTable from "../components/standings/StandingsTable";
import { fetchStandingSeasonData } from "@/server/fetchData";

const Standings = memo(() => {
  const { slugId, yearId } = useParams();

  const navigate = useNavigate();

  const paramsNation = slugId?.slice(0, 3);
  const paramsDivision = slugId?.slice(4, 5);

  const [{ data: seasonData }, { data: standingsData }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["seasonData", slugId, yearId],
        queryFn: () => fetchStandingSeasonData(slugId, yearId),
        select: (data: StandingSeasonDataTypes) => data.seasons,
      },
      {
        queryKey: ["standingData", slugId, yearId],
        queryFn: () => fetchStandingSeasonData(slugId, yearId),
        select: (data: StandingSeasonDataTypes) => data.children[0].standings,
      },
    ],
  });

  const handleCountYear = (num: number) => {
    if (num > 0 && seasonData && seasonData[0].year <= Number(yearId)) return;
    else if (
      num < 0 &&
      seasonData &&
      seasonData[seasonData.length - 1].year >= Number(yearId)
    )
      return;
    else
      navigate(
        `/standings/${paramsNation}.${paramsDivision}/${Number(yearId) + num}`
      );
  };

  const filter = seasonData
    ? seasonData.filter((item) => item.year == Number(yearId))
    : null;

  return (
    <div className="inner">
      <div className="flex gap-1">
        <NationSelectBox paramsNation={paramsNation} />
        <DivisionSelectBox
          paramsNation={paramsNation}
          paramsDivision={paramsDivision}
        />
        <YearSelectBox seasonData={seasonData} />
      </div>

      <div className="flex items-center text-3xl justify-around w-[700px] m-auto p-8">
        <span onClick={() => handleCountYear(-1)} className="cursor-pointer">
          <MdKeyboardArrowLeft />
        </span>
        {filter && filter.length > 0 && filter[0].displayName && (
          <h2>{filter[0].displayName}</h2>
        )}
        <span onClick={() => handleCountYear(1)} className="cursor-pointer">
          <MdKeyboardArrowRight />
        </span>
      </div>

      {standingsData?.entries && Array.isArray(standingsData.entries) ? (
        <StandingsTable
          paramsNation={paramsNation}
          paramsDivision={paramsDivision}
          standingsData={standingsData}
        />
      ) : (
        <p>Invalid standingsData structure</p>
      )}
    </div>
  );
});

export default Standings;

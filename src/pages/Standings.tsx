import { memo, useState } from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useSuspenseQuery } from '@tanstack/react-query';

import useStandingsDataStore from '../store/standings-store';

import NationSelectBox from '../components/standings/NationSelectBox';
import DivisionSelectBox from '../components/standings/DivisionSelectBox';
import YearSelectBox from '../components/standings/YearSelectBox';

import { useNavigate, useParams } from 'react-router-dom';

import StandingsTable from '../components/standings/StandingsTable';

const Standings = memo(() => {
  const { slugId, yearId } = useParams()

  const navigate = useNavigate()

  const paramsNation = slugId?.slice(0, 3)
  const paramsDivision = slugId?.slice(4, 5)

  const [isNationSelectBox, setIsNationSelectBox] = useState(false);
  const [isDivisionSelectBox, setIsDivisionSelectBox] = useState(false);
  const [isYearSelectBox, setIsYearSelectBox] = useState(false);

  const { fetchStandingsData, seasonData } = useStandingsDataStore()

  const { data: standingsData }
    = useSuspenseQuery({
      queryKey: ['standingData', slugId, yearId],
      queryFn: () => fetchStandingsData(slugId, yearId)
    });

  const handleCountYear = (num: number) => {
    if (num > 0 && seasonData && seasonData[0].year <= Number(yearId)) return
    else if (num < 0 && seasonData && seasonData[seasonData.length - 1].year >= Number(yearId)) return
    else navigate(`/standings/${paramsNation}.${paramsDivision}/${Number(yearId) + num}`)
  }

  const filter = seasonData ? seasonData.filter(item => item.year == Number(yearId)) : null

  const changeNation = (nation: string) => {
    setIsNationSelectBox(false);
    setIsYearSelectBox(false)
    navigate(`/standings/${nation}.1/2023`)
  }

  const changeDivision = (division: string) => {
    setIsDivisionSelectBox(false);
    setIsYearSelectBox(false)
    navigate(`/standings/${paramsNation}.${division}/2023`)
  }

  const changeYear = (year: number) => {
    setIsNationSelectBox(false);
    setIsYearSelectBox(false)
    navigate(`/standings/${paramsNation}.${paramsDivision}/${year}`)
  }

  const handleNationSelectBox = () => {
    setIsNationSelectBox(!isNationSelectBox);
    setIsDivisionSelectBox(false);
    setIsYearSelectBox(false);
  }

  const handleDivisionSelectBox = () => {
    setIsNationSelectBox(false);
    setIsDivisionSelectBox(!isDivisionSelectBox);
    setIsYearSelectBox(false);
  }

  const handleYearSelectBox = () => {
    setIsNationSelectBox(false);
    setIsDivisionSelectBox(false);
    setIsYearSelectBox(!isYearSelectBox);
  }

  return (
    <div className='inner'>
      <div className='flex'>
        <NationSelectBox
          handleSelectBox={handleNationSelectBox}
          change={changeNation}
          paramsNation={paramsNation}
          isSelectBox={isNationSelectBox}
        />

        <DivisionSelectBox
          change={changeDivision}
          isSelectBox={isDivisionSelectBox}
          paramsNation={paramsNation}
          paramsDivision={paramsDivision}
          handleSelectBox={handleDivisionSelectBox}
        />

        <YearSelectBox
          handleSelectBox={handleYearSelectBox}
          seasonData={seasonData}
          change={changeYear}
          isSelectBox={isYearSelectBox}
        />

      </div>
      <div className='flex items-center text-3xl justify-around w-[700px] m-auto p-8'>
        <span onClick={() => handleCountYear(-1)} className='cursor-pointer'><MdKeyboardArrowLeft /></span>
        {filter && filter.length > 0 && filter[0].displayName && <h2>{filter[0].displayName}</h2>}
        <span onClick={() => handleCountYear(1)} className='cursor-pointer'><MdKeyboardArrowRight /></span>
      </div>

      {
        standingsData?.entries && Array.isArray(standingsData.entries) ? (
          <StandingsTable
            paramsNation={paramsNation}
            paramsDivision={paramsDivision}
            standingsData={standingsData}
          />
        ) : (
          <p>Invalid standingsData structure</p>
        )
      }
    </div >
  );
});

export default Standings;
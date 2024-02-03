import { memo, useState } from 'react';

import { FaRegQuestionCircle } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useSuspenseQuery } from '@tanstack/react-query';

import useStandingsDataStore from '../store/standings-store';

import NationSelectBox from '../components/standings/NationSelectBox';
import DivisionSelectBox from '../components/standings/DivisionSelectBox';
import YearSelectBox from '../components/standings/YearSelectBox';

const Standings = memo(() => {
  const [selectedNation, setSelectedNation] = useState("eng");
  const [selectedNationName, setSelectedNationName] = useState("England");

  const [selectedDivision, setSelectedDivision] = useState("1");
  const [selectedDivisionName, setSelectedDivisionName] = useState("Premier League");

  const [selectedYear, setSelectedYear] = useState(2023);

  const [isNationSelectBox, setIsNationSelectBox] = useState(false);
  const [isDivisionSelectBox, setIsDivisionSelectBox] = useState(false);
  const [isYearSelectBox, setIsYearSelectBox] = useState(false);

  const { fetchStandingsData, seasonData } = useStandingsDataStore()

  const { data: standingsData }
    = useSuspenseQuery({
      queryKey: ['standingData', selectedNation, selectedDivision, selectedYear],
      queryFn: () => fetchStandingsData(selectedNation, selectedDivision, selectedYear)
    });

  const handleCountYear = (num: number) => {
    if (num > 0 && seasonData && seasonData[0].year <= selectedYear) return
    else if (num < 0 && seasonData && seasonData[seasonData.length - 1].year >= selectedYear) return
    else setSelectedYear(selectedYear + num)
  }

  const thArray = ["Rank", "Team Name", "P", "GP", "W", "D", "L", "GD", "NOTE"]

  const filter = seasonData ? seasonData.filter(item => item.year == selectedYear) : null

  const changeNation = (value: string, name: string, firstDivision: string) => {
    setSelectedNation(value)
    setSelectedNationName(name)
    setSelectedDivision("1")
    setSelectedDivisionName(firstDivision);
    setSelectedYear(2023)
    setIsNationSelectBox(false);
    setIsYearSelectBox(false)
  }

  const changeDivision = (division: string, name: string) => {
    setSelectedDivision(division);
    setSelectedDivisionName(name);
    setIsDivisionSelectBox(false);
    setIsYearSelectBox(false)
  }

  const changeYear = (year: number) => {
    setSelectedYear(year)
    setIsNationSelectBox(false);
    setIsYearSelectBox(false)
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
          selectedName={selectedNationName}
          isSelectBox={isNationSelectBox}
        />

        <DivisionSelectBox
          selectedName={selectedDivisionName}
          change={changeDivision}
          isSelectBox={isDivisionSelectBox}
          nationValue={selectedNation}
          handleSelectBox={handleDivisionSelectBox}
        />

        <YearSelectBox
          handleSelectBox={handleYearSelectBox}
          seasonData={seasonData}
          change={changeYear}
          selectedYear={selectedYear}
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
          <table className='text-center m-auto'>
            <colgroup>
              <col width={70} />
              <col width={300} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={60} />
              <col width={300} />
            </colgroup>
            <thead>
              <tr>
                {thArray.map((item, index) => (
                  <th key={index} className='p-2 border-y border-black'>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                standingsData.entries.map((entry: Entries, entryIndex: number) => {
                  const rankArray = Array.from({ length: standingsData.entries.length }, (_, index) => index + 1);
                  const statsOrderArray = ["points", "gamesPlayed", "wins", "ties", "losses", "pointDifferential", "note"];
                  return (
                    <tr key={entryIndex} className='border-b h-9'>
                      <td className='font-bold'>{rankArray[entryIndex]}</td>
                      {entry.team &&
                        <td className='flex items-center px-3 h-9'>
                          {entry.team.logos ?
                            <img src={entry.team.logos[0].href} alt={entry.team.name} title={entry.team.name} className='h-7 mr-2' />
                            : <i className='text-[28px] mr-2'><FaRegQuestionCircle /></i>}
                          {entry.team.name}
                        </td>}
                      {entry.stats && (
                        <>
                          {statsOrderArray.map((statName, index) => {
                            const stat = entry.stats.find(stat => stat.name === statName);
                            return (
                              stat && (
                                <td key={index}>
                                  {stat.value}
                                </td>
                              )
                            );
                          })}
                        </>
                      )}
                      {entry.note && <td style={{ backgroundColor: `${entry.note.color}` }}>{entry.note.description}</td>}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        ) : (
          <p>Invalid standingsData structure</p>
        )
      }
    </div >
  );
});

export default Standings;
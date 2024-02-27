import { memo, useState } from 'react';

import NationSelectBox from '../components/teams/NationSelectBox';
import DivisionSelectBox from '../components/teams/DivisionSelectBox';

import TeamList from '../components/teams/teamInfo/TeamList';

const Teams = memo(() => {

  const [selectedNationName, setSelectedNationName] = useState("England")
  const [selectedNationValue, setSelectedNationValue] = useState("eng");

  const [selectedDivisionValue, setSelectedDivisionValue] = useState("1");
  const [selectedDivisionName, setSelectedDivisionName] = useState("Premier League");

  const [isNationSelectBox, setIsNationSelectBox] = useState(false);
  const [isDivisionSelectBox, setIsDivisionSelectBox] = useState(false);

  const changeNation = (value: string, name: string, firstDivision: string) => {
    setSelectedNationValue(value);
    setSelectedNationName(name);
    setSelectedDivisionValue("1");
    setSelectedDivisionName(firstDivision);
    setIsNationSelectBox(false);
  }

  const changeDivision = (division: string, name: string) => {
    setSelectedDivisionValue(division);
    setSelectedDivisionName(name);
    setIsDivisionSelectBox(false);
  }

  const handleNationSelectBox = () => {
    setIsNationSelectBox(!isNationSelectBox);
    setIsDivisionSelectBox(false);
  }

  const handleDivisionSelectBox = () => {
    setIsDivisionSelectBox(!isDivisionSelectBox);
    setIsNationSelectBox(false);
  }

  return (
    <div className='inner'>
      <div className='flex'>

        <NationSelectBox
          selectedName={selectedNationName}
          change={changeNation}
          isSelectBox={isNationSelectBox}
          handleSelectBox={handleNationSelectBox}
        />

        <DivisionSelectBox
          selectedName={selectedDivisionName}
          change={changeDivision}
          isSelectBox={isDivisionSelectBox}
          nationValue={selectedNationValue}
          handleSelectBox={handleDivisionSelectBox}
        />

      </div>
      <TeamList
        selectedNationValue={selectedNationValue}
        selectedDivisionValue={selectedDivisionValue}
      />
    </div >
  );
});

export default Teams;
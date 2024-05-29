import { memo } from "react";

import { leagueSelectArray } from "../../assets/ArrayData";

import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  handleSelectBox: () => void;
  change: (division: string) => void;
  paramsNation: string | undefined;
  paramsDivision: string | undefined;
  isSelectBox: boolean;
}

const DivisionSelectBox = memo((props: Props) => {
  const nation = leagueSelectArray.find(
    (item) => item.value == props.paramsNation
  );
  const division = nation?.league.find(
    (item) => item.division === props.paramsDivision
  );

  // const division = leagueSelectArray.find(item => item.value == paramsDivision)
  return (
    <>
      {/* <div
        onClick={props.handleSelectBox}
        className="w-full h-full flex items-center p-3 justify-between cursor-pointer"
      >
        <span>{division?.name}</span>
        <span>
          {props.isSelectBox ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
        </span>
      </div> */}

      <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Division" />
        </SelectTrigger>

        <SelectContent className="w-full text-left hover:bg-hoverColor">
          {leagueSelectArray.map((item) => {
            if (item.value === props.paramsNation) {
              return item.league.map((league, idx) => (
                <SelectItem
                  key={idx}
                  value={league.name}
                  // className="w-full text-left h-10 px-3"
                >
                  {league.name}
                </SelectItem>
              ));
            }
          })}
        </SelectContent>
      </Select>
    </>
  );
});

export default DivisionSelectBox;

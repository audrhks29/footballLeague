import { memo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  seasonData: SeasonDataType[] | null;
}

const YearSelectBox = memo((props: Props) => {
  const navigate = useNavigate();
  const { slugId, yearId } = useParams();

  const paramsNation = slugId?.slice(0, 3);
  const paramsDivision = slugId?.slice(4, 5);

  const changeYear = (year: number) => {
    navigate(`/standings/${paramsNation}.${paramsDivision}/${year}`);
  };

  return (
    <Select onValueChange={(value) => changeYear(Number(value))} value={yearId}>
      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {props.seasonData &&
          props.seasonData.map((item, idx) => {
            return (
              <SelectItem key={idx} value={item.year.toString()}>
                {item.year}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
});

export default YearSelectBox;

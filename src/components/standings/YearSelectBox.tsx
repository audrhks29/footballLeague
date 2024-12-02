import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const YearSelectBox = memo(
  ({
    paramsNation,
    paramsDivision,
    seasonData,
  }: {
    paramsNation: string | undefined;
    paramsDivision: string | undefined;
    seasonData: SeasonDataType[];
  }) => {
    const navigate = useNavigate();
    const { yearId } = useParams();

    return (
      <select
        className="select select-bordered w-40"
        onChange={(e) =>
          navigate(
            `/standings/${paramsNation}.${paramsDivision}/${e.target.value}`
          )
        }
        value={yearId}
      >
        {seasonData &&
          seasonData.map((item, idx) => (
            <option key={idx} value={item.year.toString()}>
              {item.year}
            </option>
          ))}
      </select>
    );
  }
);

export default YearSelectBox;

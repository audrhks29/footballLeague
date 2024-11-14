import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  data: MatchResultType;
}

const Commentary = memo(({ data }: Props) => {
  return (
    <Card className="container mx-auto w-full h-full">
      <CardHeader className="text-center">
        <CardTitle>Play Commentary</CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="absolute border-opacity-10 border-gray-700 h-full border left-1/2"></div>
        {data.keyEvents.map((item) => {
          console.log(item.type.text === "Kickoff");
          if (
            item.type.text === "Kickoff" ||
            item.type.text === "Halftime" ||
            item.type.text === "Start 2nd Half" ||
            item.type.text === "End Regular Time"
          ) {
            return (
              <div className="mb-8 bg-gray-600 text-white text-center rounded-lg shadow-xl w-5/12 px-6 py-4 m-auto">
                <h3 className="mb-3 font-bold text-xl">[{item.type.text}]</h3>
                <p className="text-sm leading-snug tracking-wide">
                  {item.text}
                </p>
              </div>
            );
          } else {
            return (
              <div
                className={`${
                  item?.team?.displayName ===
                  data.boxscore.teams[0].team.displayName
                    ? "flex-row-reverse"
                    : ""
                } mb-8 flex justify-between items-center w-full`}
              >
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                  <h3 className="mx-auto font-semibold text-lg text-white">
                    {item.clock.displayValue}
                  </h3>
                </div>
                <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-gray-800 text-xl">
                    [{item.type.text}]
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </CardContent>
    </Card>
  );
});

export default Commentary;

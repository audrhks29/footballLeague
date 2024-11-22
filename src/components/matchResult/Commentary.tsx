import { memo } from "react";

interface Props {
  matchResultData: MatchResultType;
}

const Commentary = memo(({ matchResultData }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title justify-center">Play Commentary</h3>
      </div>

      <ul className="timeline timeline-vertical">
        {matchResultData.keyEvents.map((item) => {
          if (
            item.type.text === "Kickoff" ||
            item.type.text === "Halftime" ||
            item.type.text === "Start 2nd Half" ||
            item.type.text === "End Regular Time"
          ) {
            return (
              <li>
                <hr />
                <div className="timeline-middle timeline-box text-center">
                  <h4 className="mb-3 font-semibold text-lg">
                    [{item.type.text}]
                  </h4>
                  <p>{item.text}</p>
                </div>
                <hr />
              </li>
            );
          } else {
            return (
              <li>
                <hr />
                <div className="timeline-middle">
                  <h4 className="mb-3 font-semibold text-lg">
                    {item.clock.displayValue}
                  </h4>
                </div>

                <div
                  className={`${
                    item?.team?.displayName ===
                    matchResultData.boxscore.teams[0].team.displayName
                      ? "timeline-start mr-9"
                      : "timeline-end ml-9"
                  } timeline-box`}
                >
                  <div>
                    <h4 className="mb-3 font-bold text-lg">
                      [{item.type.text}]
                    </h4>
                    <p className="text-sm">{item.text}</p>
                  </div>
                </div>
                <hr />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
});

export default Commentary;

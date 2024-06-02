import { CSSProperties, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  data: MatchResultType;
}

const Commentary = memo(({ data }: Props) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Play Commentary</CardTitle>
      </CardHeader>
      <CardContent>
        {data.keyEvents.map((item) => {
          // console.log(item.play.team);
          let style: CSSProperties | undefined = undefined;
          if (item && item.team && item.team.displayName) {
            // homeTeam
            if (
              item.team.displayName === data.boxscore.teams[0].team.displayName
            )
              style = { textAlign: "left", marginRight: "auto" };
            // awayTeam
            if (
              item.team.displayName === data.boxscore.teams[1].team.displayName
            )
              style = { textAlign: "right", marginLeft: "auto" };
          } else style = { textAlign: "center", margin: "auto" };
          return (
            <Card className="my-2 w-2/5 p-2 grid" style={style}>
              <span className="font-bold">{item.clock.displayValue}</span>
              <span className="font-bold">[{item.type.text}]</span>
              <span>{item.text}</span>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
});

export default Commentary;

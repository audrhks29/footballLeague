import { CSSProperties, memo } from 'react';

interface Props {
  data: MatchResultType;
}

const Commentary = memo(({ data }: Props) => {

  return (
    <ul className='my-10'>
      {data.commentary.map(item => {
        // console.log(item.play.team);
        let style: CSSProperties | undefined = undefined;
        if (item.play && item.play.team && item.play.team.displayName) {

          // homeTeam
          if (item.play.team.displayName === data.boxscore.teams[0].team.displayName) {
            style = { textAlign: "left", marginRight: "auto" }
          }

          // awayTeam
          if (item.play.team.displayName === data.boxscore.teams[1].team.displayName) {
            style = { textAlign: "right", marginLeft: "auto" }
          }
        }

        else {
          style = { textAlign: "center", margin: "auto" }
        }
        return (
          <li className='py-2 w-1/2' style={style}>
            <div className='flex flex-col border'>
              <span className='font-bold'>{item.time.displayValue}</span>
              <span>{item.text}</span>
            </div>
          </li>
        )
      })}
    </ul>
  );
});

export default Commentary;
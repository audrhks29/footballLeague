import { CSSProperties, memo } from 'react';

interface Props {
  data: MatchResultType;
}

const Commentary = memo(({ data }: Props) => {

  return (
    <ul className='mt-10'>
      {data.keyEvents.map(item => {
        // console.log(item.play.team);
        let style: CSSProperties | undefined = undefined;
        if (item && item.team && item.team.displayName) {
          // homeTeam
          if (item.team.displayName === data.boxscore.teams[0].team.displayName) style = { textAlign: "left", marginRight: "auto" }
          // awayTeam
          if (item.team.displayName === data.boxscore.teams[1].team.displayName) style = { textAlign: "right", marginLeft: "auto" }
        }
        else style = { textAlign: "center", margin: "auto" }
        return (
          <li className='my-2 w-2/5 bg-[#3f3f3f]' style={style}>
            <div className='flex flex-col border p-2'>
              <span className='font-bold'>{item.clock.displayValue}</span>
              <span className='font-bold'>[{item.type.text}]</span>
              <span>{item.text}</span>
            </div>
          </li>
        )
      })}
    </ul>
  );
});

export default Commentary;
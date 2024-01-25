import React, { memo } from 'react';

const MatchResult = memo(({ data }) => {
  return (
    <table>
      <colgroup>
        <col width={200} />
        <col width={36} />
        <col width={150} />
        <col width={20} />
        <col width={150} />
        <col width={36} />
      </colgroup>
      <thead className='border-black border-y-2 h-10'>
        <tr>
          <th>Match Time</th>
          <th colSpan={2}>Home</th>
          <th></th>
          <th colSpan={2}>Away</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {data && data.map((item, index) => {
          const matchInfo = item.competitions[0]
          const homeTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "home");
          const AwayTeamData = item.competitions[0].competitors.find(competitor => competitor.homeAway === "away");
          return (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={2} className='h-16'><span>{matchInfo.date}</span></td>
                <td rowSpan={2}>{homeTeamData.team.logo &&
                  <img src={homeTeamData.team.logo} className='h-8' />}</td>
                <td><span>{homeTeamData.team.shortDisplayName}</span></td>
                <td><span>vs</span></td>
                <td><span>{AwayTeamData.team.shortDisplayName}</span></td>
                <td rowSpan={2}>{AwayTeamData.team.logo &&
                  <img src={AwayTeamData.team.logo} className='h-8' />}</td>
              </tr>
              <tr className='border-b'>
                <td>{homeTeamData.score}</td>
                <td>-</td>
                <td>{AwayTeamData.score}</td>
              </tr>
            </React.Fragment>
          )
        })}
      </tbody>
    </table >
  );
});

export default MatchResult;
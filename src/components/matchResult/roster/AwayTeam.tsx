import { memo } from 'react';

interface Props {
  data: Rosters
}

const AwayTeam = memo(({ data }: Props) => {
  const hideGKTh = ["FC", "FA", "OG", "G", "SH", "A", "ST", "SUB"]
  const hideFieldTh = ["FC", "FA", "OG", "SHF", "SUB", "GA", "OF", "SV"]

  return (
    <div className='w-auto'>
      <table className='text-center mb-3'>
        <colgroup>
          <col width={45} />
          <col width={32} />
          <col width={140} />
          {data.roster[1].stats &&
            <>
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
            </>}
        </colgroup>
        <thead>
          <tr className='h-8 border-y'>
            <th title='position'>POS</th>
            <th title='jersey'>NO</th>
            <th>Name</th>
            {data.roster[0].stats && data.roster[0].stats.map((item, index) =>
              hideGKTh.includes(item.abbreviation)
                ? "" : <th title={item.displayName} key={index}>{item.abbreviation}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.roster.map((item, index) => {
            if (item.position.abbreviation === "G")
              return (
                <tr key={index} className='border-b h-7 border-tableBorderColor'>
                  <td>{item.position.abbreviation}</td>
                  <td>{item.jersey}</td>
                  <td>{item.athlete.fullName}</td>
                  {item.stats && item.stats.map((stat, idx) =>
                    hideGKTh.includes(stat.abbreviation)
                      ? "" : <td key={idx}>{stat.value}</td>)}
                </tr>
              )
          })}
        </tbody>
      </table >

      <table className='text-center'>
        <colgroup>
          <col width={45} />
          <col width={32} />
          <col width={140} />
          {data.roster[1].stats &&
            <>
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
              <col width={28} />
            </>}
        </colgroup>
        <thead>
          <tr className='h-8 border-y'>
            <th title='position'>POS</th>
            <th title='jersey'>NO</th>
            <th>Name</th>
            {data.roster[1].stats && data.roster[1].stats.map((item, index) =>
              hideFieldTh.includes(item.abbreviation)
                ? "" : <th title={item.displayName} key={index}>{item.abbreviation}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.roster.map((item, index) => {
            if (item.position.abbreviation !== "G")
              return (
                <tr key={index} className='border-b h-7 border-tableBorderColor'>
                  <td>{item.position.abbreviation}</td>
                  <td>{item.jersey}</td>
                  <td>{item.athlete.fullName}</td>
                  {item.stats && item.stats.map((stat, idx) =>
                    hideFieldTh.includes(stat.abbreviation)
                      ? "" : <td key={idx}>{stat.value}</td>)}
                </tr>
              )
          })}
        </tbody>
      </table>
    </div >
  );
});

export default AwayTeam;
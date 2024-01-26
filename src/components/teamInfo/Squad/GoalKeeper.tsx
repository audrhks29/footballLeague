import { memo } from 'react';

interface Props {
  item: PlayerDataType;
  index: number;
}

const GoalKeeper = memo(({ item, index }: Props) => {

  if (item.position.name == "Goalkeeper" && item.statistics) {
    const name = item.displayName;
    const no = item.jersey;
    const age = item.age;
    const height = (item.height * 2.54).toFixed(1);
    const weight = (item.weight * 0.453592).toFixed(1);
    const country = item.flag ? item.flag.alt : "-";
    const countryImage = item.flag ? item.flag.href : "-";

    const generalCategory = item.statistics.splits.categories.find(category => category.name === 'general')
    const offensiveCategory = item.statistics.splits.categories.find(category => category.name === 'offensive')
    const goalKeeping = item.statistics.splits.categories.find(category => category.name === 'goalKeeping')

    const app = generalCategory?.stats.find(stat => stat.name === 'appearances');
    const subIn = generalCategory?.stats.find(stat => stat.name === 'subIns');
    const save = goalKeeping?.stats.find(stat => stat.name === 'saves');
    const goalsConceded = goalKeeping?.stats.find(stat => stat.name === 'goalsConceded');
    const goalAssists = offensiveCategory?.stats.find(stat => stat.name === 'goalAssists');
    const foulsCommitted = generalCategory?.stats.find(stat => stat.name === 'foulsCommitted');
    const foulsSuffered = generalCategory?.stats.find(stat => stat.name === 'foulsSuffered');
    const yellowCard = generalCategory?.stats.find(stat => stat.name === 'yellowCards');
    const redCard = generalCategory?.stats.find(stat => stat.name === 'redCards');
    return (
      <tr key={index} className='h-7 border-b'>
        <td className='text-left'>{name}</td>
        <td>{no}</td>
        <td>{age}</td>
        <td>{height}cm</td>
        <td>{weight !== "NaN" ? weight + "kg" : "-"}</td>
        <td className='text-left indent-2'><img src={countryImage} alt="" className='h-4 inline-block mr-2' />{country} </td>
        <td>{app?.value}</td>
        <td>{subIn?.value}</td>
        <td>{save?.value}</td>
        <td>{goalsConceded?.value}</td>
        <td>{goalAssists?.value}</td>
        <td>{foulsCommitted?.value}</td>
        <td>{foulsSuffered?.value}</td>
        <td>{yellowCard?.value}</td>
        <td>{redCard?.value}</td>
      </tr>
    );
  }
});

export default GoalKeeper;
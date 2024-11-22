import { memo } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {
  matchResultData: MatchResultType;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MatchResultTable = memo(({ matchResultData }: Props) => {
  const homeTeamName = matchResultData.boxscore.teams[0].team.displayName;
  const awayTeamName = matchResultData.boxscore.teams[1].team.displayName;
  const homeTeamData = matchResultData.boxscore.teams[0].statistics;
  const awayTeamData = matchResultData.boxscore.teams[1].statistics;

  // 라벨 설정
  const labels = homeTeamData.map((item) => item.label);

  const data = {
    labels,
    datasets: [
      {
        label: matchResultData.boxscore.teams[0].team.displayName,
        data: homeTeamData.map(
          (item, index) =>
            -(
              (Number(item.displayValue) /
                (Number(item.displayValue) +
                  Number(awayTeamData[index].displayValue))) *
              100
            )
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
      {
        label: matchResultData.boxscore.teams[1].team.displayName,
        data: awayTeamData.map(
          (item, index) =>
            (Number(item.displayValue) /
              (Number(item.displayValue) +
                Number(homeTeamData[index].displayValue))) *
            100
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    interaction: {
      mode: "index" as const,
      axis: "x" as const,
      intersect: true,
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    legend: {
      position: "top" as const,
    },
    scales: {
      x: {
        display: false,
        drawBorder: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          label: (context: { datasetIndex: number; dataIndex: number }) => {
            console.log(context.dataIndex);
            if (context.datasetIndex === 0) {
              return !labels[context.dataIndex].includes("%")
                ? `${homeTeamName} ${
                    homeTeamData[context.dataIndex].displayValue
                  }`
                : `${homeTeamName} ${
                    Number(homeTeamData[context.dataIndex].displayValue) * 100
                  }%`;
            } else {
              return !labels[context.dataIndex].includes("%")
                ? `${awayTeamName} ${
                    awayTeamData[context.dataIndex].displayValue
                  }`
                : `${awayTeamName} ${
                    Number(awayTeamData[context.dataIndex].displayValue) * 100
                  }%`;
            }
          },
        },
      },
    },
  };

  return (
    <section>
      <Bar options={options} data={data} />
    </section>
  );
});

export default MatchResultTable;

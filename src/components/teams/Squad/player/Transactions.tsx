import { memo } from "react";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaRegQuestionCircle } from "react-icons/fa";

const Transactions = memo(
  (props: { fetchUrl: string; playerData: PlayerDataType }) => {
    const { data: playerTransactionsData }: { data: playerTransactionsTypes } =
      useSuspenseQuery({
        queryKey: ["playerTransactionsData", props.fetchUrl],
        queryFn: async () => {
          const url = props.fetchUrl;
          const response = await axios.get(url);
          return response.data;
        },
      });

    const fetchTransactionsTeamData = async (key: "from" | "to") => {
      const responses = await Promise.all(
        playerTransactionsData.items.map((item) => axios.get(item[key].$ref))
      );
      return responses.map((response) => response.data);
    };

    const [{ data: fromData }, { data: toData }] = useSuspenseQueries({
      queries: [
        {
          queryKey: ["fromData", props.fetchUrl],
          queryFn: () => fetchTransactionsTeamData("from"),
        },
        {
          queryKey: ["toData", props.fetchUrl],
          queryFn: () => fetchTransactionsTeamData("to"),
        },
      ],
    });

    return (
      <section className="col-start-2">
        <div className="card-body">
          <div className="card-title">
            <h3>Player's Transactions</h3>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">From</th>
                <th className="text-center">To</th>
                <th className="text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {fromData &&
                toData &&
                playerTransactionsData.items.map((item, index) => {
                  const fromTeamLogo = Array.isArray(fromData[index].logos)
                    ? fromData[index].logos[1]
                    : fromData[index].logos;
                  const toTeamLogo = Array.isArray(toData[index].logos)
                    ? toData[index].logos[1]
                    : toData[index].logos;
                  const type = item.displayAmount;
                  const date = item.date.slice(0, 10);

                  return (
                    <tr key={index} className="text-center">
                      <td>{date}</td>
                      <td>
                        <div className="flex items-center justify-center">
                          {fromTeamLogo ? (
                            <img
                              src={fromTeamLogo.href}
                              className="w-6 h-6 mr-2"
                            />
                          ) : (
                            <i className="text-[24px] mr-2">
                              <FaRegQuestionCircle />
                            </i>
                          )}
                          <span>{fromData[index].displayName}</span>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center justify-center">
                          {toTeamLogo ? (
                            <img
                              src={toTeamLogo.href}
                              className="w-6 h-6 mr-2"
                            />
                          ) : (
                            <i className="text-[24px] mr-2">
                              <FaRegQuestionCircle />
                            </i>
                          )}
                          <span>{toData[index].displayName}</span>
                        </div>
                      </td>

                      <td>{type}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
);

export default Transactions;

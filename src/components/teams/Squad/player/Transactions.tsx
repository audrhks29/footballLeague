import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";

import axios from "axios";

import { memo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

interface Props {
  fetchUrl: string;
  playerData: PlayerDataType;
}

const Transactions = memo((props: Props) => {
  const fetchTransactionsData = async () => {
    const url = props.fetchUrl;
    const response = await axios.get(url);
    return response.data;
  };

  const { data: playerTransactionsData }: { data: playerTransactionsTypes } =
    useSuspenseQuery({
      queryKey: ["playerTransactionsData", props.fetchUrl],
      queryFn: () => fetchTransactionsData(),
    });

  const fetchFromTeamData = async () => {
    const responses = await Promise.all(
      playerTransactionsData.items.map((item) => axios.get(item.from.$ref))
    );
    const responseData = responses.map((response) => response.data);
    return responseData;
  };

  const fetchToTeamData = async () => {
    const responses = await Promise.all(
      playerTransactionsData.items.map((item) => axios.get(item.to.$ref))
    );
    const responseData = responses.map((response) => response.data);
    return responseData;
  };

  const [{ data: fromData }, { data: toData }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["fromData", props.fetchUrl],
        queryFn: () => fetchFromTeamData(),
      },
      {
        queryKey: ["toData", props.fetchUrl],
        queryFn: () => fetchToTeamData(),
      },
    ],
  });

  return (
    <Card className="col-start-2">
      <CardHeader>
        <CardTitle>Player's Transactions</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">From</TableHead>
              <TableHead className="text-center">To</TableHead>
              <TableHead className="text-center">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                  <TableRow key={index} className="text-center">
                    <TableCell>{date}</TableCell>
                    <TableCell>
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
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center">
                        {toTeamLogo ? (
                          <img src={toTeamLogo.href} className="w-6 h-6 mr-2" />
                        ) : (
                          <i className="text-[24px] mr-2">
                            <FaRegQuestionCircle />
                          </i>
                        )}
                        <span>{toData[index].displayName}</span>
                      </div>
                    </TableCell>

                    <TableCell>{type}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default Transactions;

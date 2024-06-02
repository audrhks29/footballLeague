import { useSuspenseQuery } from "@tanstack/react-query";

import axios from "axios";

import { memo } from "react";

import { useParams } from "react-router-dom";

import LeagueList from "./LeagueList";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const NewsBoard = memo(() => {
  const { newsId } = useParams<string>();

  const fetchDataUseLink = async () => {
    const url = `http://now.core.api.espn.com/v1/sports/news/${newsId}`;
    try {
      const response = await axios.get(url);
      return response.data.headlines[0];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: boardData } = useSuspenseQuery({
    queryKey: ["boardData", newsId],
    queryFn: () => fetchDataUseLink(),
  });

  const date = new Date(boardData.published);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const outputDateString = date.toLocaleDateString("en-US", options);

  return (
    <div className="inner flex relative">
      <LeagueList />

      <Card className="w-[900px] ml-auto">
        {boardData && (
          <div className="p-6">
            <CardHeader>
              <CardTitle>{boardData.headline}</CardTitle>
            </CardHeader>
            <div className="flex justify-between px-6">
              <CardDescription>{boardData.byline}</CardDescription>
              <CardDescription>{outputDateString}</CardDescription>
            </div>
            <Separator />

            <CardContent>
              {boardData.images.length > 0 && (
                <img
                  src={boardData.images[0].url}
                  className="w-[800px] m-auto my-4"
                />
              )}
              <Separator />

              <div
                className="text-[16px]"
                dangerouslySetInnerHTML={{ __html: boardData.story }}
              />
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
});

export default NewsBoard;

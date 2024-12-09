import { memo } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import axios from "axios";

import LeagueList from "./LeagueList";

import dateFormat from "@/utils/dateFormat";

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

  return (
    <div className="inner flex relative">
      <section className="grid grid-cols-[250px_1fr] gap-6">
        <LeagueList />

        <article className="card bg-base-100 shadow-xl">
          {boardData && (
            <div className="card-body">
              <div className="card-title">{boardData.headline}</div>

              <div className="flex justify-between">
                <span>{boardData.byline}</span>
                <span>{dateFormat(boardData.published)}</span>
              </div>

              <div className="divider my-0"></div>

              <div>
                {boardData.images.length > 0 && (
                  <img src={boardData.images[0].url} className="m-auto my-4" />
                )}

                <div className="divider my-0"></div>

                <div
                  className="text-[16px]"
                  dangerouslySetInnerHTML={{ __html: boardData.story }}
                />
              </div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
});

export default NewsBoard;

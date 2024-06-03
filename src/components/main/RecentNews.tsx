import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchNewsData } from "@/server/fetchData";

const RecentNews = memo(({ slugId }: { slugId: string }) => {
  const navigate = useNavigate();
  const { data: newsData } = useSuspenseQuery({
    queryKey: [`newsDat${slugId}`],
    queryFn: () => fetchNewsData(slugId, 5),
  });

  const clickNews = (index: number, slugId: string) => {
    const url = newsData[index].links.api.news.href;
    const pattern = /news\/(.+)/;
    const result = url.match(pattern);

    if (result) navigate(`/news/${slugId}/1/${result[1]}`);
    else alert("Could not find Board");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent News</CardTitle>
      </CardHeader>

      <CardContent>
        {newsData.map((news: { headline: string }, index: number) => (
          <div key={index}>
            <span
              className="cursor-pointer hover:text-blue-500"
              onClick={() => clickNews(index, newsData.slugId)}
            >
              {news.headline}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

export default RecentNews;

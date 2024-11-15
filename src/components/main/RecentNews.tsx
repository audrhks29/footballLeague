import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchNewsData } from "@/services/fetchData";

const RecentNews = memo(({ slugId }: { slugId: string }) => {
  const navigate = useNavigate();

  const { data: newsData } = useSuspenseQuery({
    queryKey: [`newsData${slugId}`],
    queryFn: () => fetchNewsData(slugId, 5),
  });

  return (
    <section className="card border bg-base shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <span>Recent News</span>
          <span
            onClick={() => navigate(`/news/${slugId}/page=1`)}
            className="link link-hover text-[12px] font-normal"
          >
            more +
          </span>
        </h2>

        {newsData.map((news: { headline: string }, index: number) => (
          <span
            key={index}
            className="link hover:text-blue-500"
            onClick={() => {
              const url =
                newsData[index].links.api.self.href ||
                newsData[index].links.api.news.href;
              const pattern = /news\/(.+)/;

              const result = url.match(pattern);

              if (result) navigate(`/news/${slugId}/1/${result[1]}`);
              else alert("Could not find Board");
            }}
          >
            {news.headline}
          </span>
        ))}
      </div>
    </section>
  );
});

export default RecentNews;

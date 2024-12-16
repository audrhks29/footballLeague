import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import LeagueList from "../components/news/LeagueList";

import { fetchNewsData } from "@/services/fetchData";
import dateFormat from "@/utils/dateFormat";

const News = memo(() => {
  const { slugId, pageIndex } = useParams();
  const navigate = useNavigate();

  const { data: newsData } = useSuspenseQuery({
    queryKey: [`newsData${slugId}`, slugId],
    queryFn: () => fetchNewsData(slugId, 100),
  });

  const clickNews = (index: number) => {
    const url =
      newsData[index].links.api.self.href ||
      newsData[index].links.api.news.href;
    const pattern = /news\/(.+)/;
    const result = url.match(pattern);

    if (result) navigate(`/news/${slugId}/${pageIndex}/${result[1]}`);
    else alert("Could not find Board");
  };

  const newsItemPerPage = 6;
  const currentPage = Number(pageIndex?.split("=")[1]);
  const slicedNewsData = newsData.slice(
    (currentPage - 1) * newsItemPerPage,
    currentPage * newsItemPerPage
  );
  const pageList = Array.from(
    { length: newsData.length / newsItemPerPage + 1 },
    (_, k) => k + 1
  );

  const clickPageButton = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pageList.length)
      navigate(`/news/${slugId}/page=${pageNumber}`);
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="inner relative">
      <section className="grid grid-cols-[250px_1fr] gap-6">
        <LeagueList />

        <article className="ml-auto col-start-2 grid grid-cols-3 gap-3">
          {slicedNewsData.map((item: NewsItemType, index: number) => {
            return (
              <div
                className="card bg-base-300 hover:bg-base-200 cursor-pointer"
                key={index}
                onClick={() => clickNews(index)}
              >
                <figure>
                  {item.images.length > 0 && (
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].art}
                      title={item.images[0].caption}
                    />
                  )}
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{item.headline}</h3>
                  <p>{item.description}</p>
                  <div className="text-right">{dateFormat(item.published)}</div>
                </div>
              </div>
            );
          })}
        </article>

        <div className="join justify-center">
          <button
            className="join-item btn"
            onClick={() => clickPageButton(currentPage - 1)}
          >
            Previous page
          </button>

          {pageList.map((item) => (
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              onClick={() => clickPageButton(item)}
              key={item}
              aria-label={item.toString()}
              defaultChecked={item === currentPage}
            />
          ))}

          <button
            className="join-item btn"
            onClick={() => clickPageButton(currentPage - 1)}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
});

export default News;

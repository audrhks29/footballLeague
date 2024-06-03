import { memo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useSuspenseQuery } from "@tanstack/react-query";

import LeagueList from "../components/news/LeagueList";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchNewsData } from "@/server/fetchData";

const News = memo(() => {
  const { slugId, pageIndex } = useParams();
  const navigate = useNavigate();

  const { data: newsData } = useSuspenseQuery({
    queryKey: ["newsData", slugId],
    queryFn: () => fetchNewsData(slugId),
  });

  const clickNews = (index: number) => {
    const url = newsData[index].links.api.news.href;
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
      <div className="grid grid-cols-[250px_minmax(950px, 2fr)]">
        <LeagueList />

        <section className="w-[900px] ml-auto col-start-2">
          {slicedNewsData.map((item: NewsItemType, index: number) => {
            const date = new Date(item.published);
            const options: DateTimeFormatOptions = {
              year: "numeric",
              weekday: "long",
              month: "long",
              day: "numeric",
            };
            const outputDateString = date.toLocaleDateString("en-US", options);

            return (
              <Card
                className="m-auto mb-5 cursor-pointer"
                key={index}
                onClick={() => clickNews(index)}
              >
                {item.images.length > 0 && (
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].art}
                    title={item.images[0].caption}
                    className="w-[900px] m-auto"
                  />
                )}

                <div className="w-[900px] m-auto p-3">
                  <CardTitle className="text-[20px] pb-2">
                    {item.headline}
                  </CardTitle>
                  <CardContent className="p-0">{item.description}</CardContent>
                  <CardDescription className="text-right">
                    {outputDateString}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </section>

        <Pagination>
          <PaginationContent>
            <PaginationItem
              onClick={() => clickPageButton(currentPage - 1)}
              className="cursor-pointer"
            >
              <PaginationPrevious />
            </PaginationItem>
            {pageList.map((item, index) => (
              <PaginationItem
                onClick={() => clickPageButton(item)}
                key={index}
                className={`${
                  currentPage === item
                    ? "bg-muted cursor-pointer "
                    : "cursor-pointer"
                }`}
              >
                <PaginationLink
                  className={`${currentPage === item ? "font-bold" : ""}`}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              onClick={() => clickPageButton(pageList.length)}
              className="cursor-pointer"
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
});

export default News;

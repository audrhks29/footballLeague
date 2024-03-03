import { memo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useNewsStore from '../store/news-store';

import { useSuspenseQuery } from '@tanstack/react-query';

import LeagueList from '../components/news/LeagueList';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const News = memo(() => {
  const { slugId, pageIndex } = useParams();
  const navigate = useNavigate();

  const { fetchNewsData } = useNewsStore();

  const { data: newsData } = useSuspenseQuery({
    queryKey: ['newsData', slugId],
    queryFn: () => fetchNewsData(slugId)
  });

  const clickNews = (index: number) => {
    const url = newsData[index].links.api.news.href
    const pattern = /news\/(.+)/;
    const result = url.match(pattern);

    if (result) navigate(`/news/${slugId}/${pageIndex}/${result[1]}`)
    else alert("Could not find Board")
  }

  const newsItemPerPage = 6;
  const currentPage = Number(pageIndex?.split("=")[1])
  const slicedNewsData = newsData.slice((currentPage - 1) * newsItemPerPage, currentPage * newsItemPerPage)
  const pageList = Array.from({ length: (newsData.length / newsItemPerPage) + 1 }, ((_, k) => k + 1))

  const clickPageButton = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pageList.length)
      navigate(`/news/${slugId}/page=${pageNumber}`)
    window.scrollTo({
      top: 0,
    });
  }
  console.log(slicedNewsData);
  return (
    <div className='inner relative'>
      <div className='grid grid-cols-[250px_minmax(950px, 2fr)] grid-rows-[280px_minmax(300px, 5fr)]'>
        <LeagueList />
        <ul className='w-[900px] ml-auto col-start-2'>
          {
            slicedNewsData.map((item: NewsItemType, index: number) => {
              const date = new Date(item.published);
              const options: DateTimeFormatOptions = { year: 'numeric', weekday: 'long', month: 'long', day: 'numeric' };
              const outputDateString = date.toLocaleDateString('en-US', options)

              return (
                <li
                  className='m-auto bg-hoverColor mb-5 cursor-pointer'
                  key={index}
                  onClick={() => clickNews(index)}
                >
                  {item.images.length > 0 && <img
                    src={item.images[0].url}
                    alt={item.images[0].art}
                    title={item.images[0].caption}
                    className='w-[900px] m-auto' />}
                  <div className='w-[900px] m-auto p-3'>
                    <h3 className='text-[20px] pb-2'>{item.headline}</h3>
                    <h4 className='pb-2'>{item.description}</h4>
                    <p className='text-right'>{outputDateString}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>

        <ul className='col-start-2 flex w-[900px] ml-auto justify-center items-center'>
          <li
            className='pagination_arrow'
            onClick={() => clickPageButton(1)}>
            <MdKeyboardDoubleArrowLeft />
          </li>
          <li
            className='pagination_arrow'
            onClick={() => clickPageButton(currentPage - 1)}>
            <MdKeyboardArrowLeft />
          </li>

          {pageList.map((item, index) => {
            return (
              <li
                key={index}
                className='pagination_list'
                style={{ backgroundColor: `${currentPage}` === String(item) ? "#575757" : "" }}
                onClick={() => clickPageButton(item)}
              >
                {item}</li>
            )
          })}

          <li
            className='pagination_arrow'
            onClick={() => clickPageButton(currentPage + 1)}>
            <MdKeyboardArrowRight />
          </li>
          <li
            className='pagination_arrow'
            onClick={() => clickPageButton(pageList.length)}>
            <MdKeyboardDoubleArrowRight />
          </li>
        </ul>

      </div>
    </div >
  );
});

export default News;
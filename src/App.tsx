import { Suspense } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./layout/Header";
import Main from "./pages/Main";
import Standings from "./pages/Standings";
import News from "./pages/News";
import Teams from "./pages/Teams";
import TeamInfo from "./pages/TeamInfo";
import MatchResult from "./pages/MatchResult";

import NewsBoard from "./components/news/NewsBoard";
import Player from "./pages/Player";
import NotFoundPath from "./pages/NotFoundPath";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <NotFoundPath />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: "standings/:slugId/:yearId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Standings />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "news/:slugId/:pageIndex",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <News />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "news/:slugId/:pageIndex/:newsId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <NewsBoard />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "teams/:slugId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Teams />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "teams/:slugId/:teamId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <TeamInfo />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "teams/:slugId/:teamId/player/:playerId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Player />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "match/:slugId/:gameId",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <MatchResult />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;

import axios from "axios";

// 선택한 팀 데이터
export const fetchTeamData = async (
  slugId: string | undefined,
  teamId: string | undefined
) => {
  const response = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}`
  );
  return response.data.team;
};

// 리그별 팀 전체 데이터
export const fetchTeamsData = async (slugId: string) => {
  const response = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams`
  );
  return response.data.sports[0].leagues[0];
};

// 선택한 선수 데이터
export const fetchPlayerData = async (
  slugId: string | undefined,
  playerId: string | undefined
) => {
  const url = `http://sports.core.api.espn.com/v2/sports/soccer/leagues/${slugId}/athletes/${playerId}`;

  const response = await axios.get(url);
  return response.data;
};

// 최근 5경기 데이터
export const fetchSummarizeStatsData = async (
  slugId: string | undefined,
  teamId: string | undefined
) => {
  try {
    const response = await axios.get(
      `https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=2023`
    );
    if (response) {
      const data: StandingsDataTypes = response.data.children[0].standings;
      const filteredData = data.entries.find(
        (item: EntriesDataTypes) => item.team.id == teamId
      );
      return filteredData;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// 스쿼드 데이터
export const fetchSquadData = async (
  slugId: string | undefined,
  teamId: string | undefined
) => {
  const response = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}/roster`
  );
  return response.data.athletes;
};

export const fetchStandingSeasonData = async (
  slugId: string | undefined,
  yearId: string | undefined
) => {
  try {
    const response = await axios.get(
      `https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=${yearId}`
    );
    if (response) {
      return response.data;
    } else return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// 뉴스 데이터
export const fetchNewsData = async (slugId: string | undefined) => {
  try {
    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/news?limit=100`
    );
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 매치 결과 데이터
export const fetchMatchResultData = async (
  slugId: string | undefined,
  gameId: string | undefined
) => {
  const responseMatchResult = await axios.get(
    `https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/summary?event=${gameId}`
  );
  return responseMatchResult.data;
};

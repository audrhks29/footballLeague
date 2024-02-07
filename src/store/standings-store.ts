import create from 'zustand';

import axios from 'axios';

interface StandingsDataStoreType {
  standingsData: StandingsDataType | null;
  seasonData: SeasonDataType[] | null;
  fetchStandingsData: (slugId: string | undefined, yearId: string | undefined)
    => Promise<StandingsDataType>
  fetchSummarizeStatsData: (slugId: string | undefined, teamId: string | undefined)
    => Promise<Entries | null | undefined>
}

const useStandingsDataStore = create<StandingsDataStoreType>(set => ({
  standingsData: null,
  seasonData: null,
  fetchStandingsData: async (slugId, yearId) => {
    try {
      const response = await axios.get(`https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=${yearId}`);
      if (response) {
        const season = response.data.seasons
        const data = response.data.children[0].standings
        set({ seasonData: season, standingsData: data })
        return data
      }
      else return null

    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
  },

  fetchSummarizeStatsData: async (slugId, teamId) => {
    try {
      const response = await axios.get(`https://site.web.api.espn.com/apis/v2/sports/soccer/${slugId}/standings?season=2023`);
      if (response) {
        const data: StandingsDataType = response.data.children[0].standings
        const filteredData = data.entries.find(item => item.team.id == teamId)
        return filteredData
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
  }
}));


export default useStandingsDataStore;
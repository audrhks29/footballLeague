import create from 'zustand';

import axios from 'axios';

interface StandingsDataStoreType {
  standingsData: StandingsDataType | null;
  seasonData: SeasonDataType[] | null;
  fetchStandingsData: (selectedNation: string, selectedDivision: string, selectedYear: number)
    => Promise<StandingsDataType>
}

const useStandingsDataStore = create<StandingsDataStoreType>(set => ({
  standingsData: null,
  seasonData: null,
  fetchStandingsData: async (selectedNation, selectedDivision, selectedYear) => {
    try {
      const response = await axios.get(`https://site.web.api.espn.com/apis/v2/sports/soccer/${selectedNation}.${selectedDivision}/standings?season=${selectedYear}`);
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
  }
}));


export default useStandingsDataStore;
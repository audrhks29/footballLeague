import create from 'zustand';

import axios from 'axios';

interface RosterDataStoreType {
  rosterData: PlayerDataType[] | null;
  fetchRosterData: (slugId: string | undefined, teamId: string | undefined)
    => Promise<PlayerDataType[]>
}

const useRosterDataStore = create<RosterDataStoreType>(set => ({
  rosterData: null,
  fetchRosterData: async (slugId, teamId) => {
    const responseRoster = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}/roster`);
    set({ rosterData: responseRoster.data.athletes })
    return responseRoster.data.athletes;
  }
}));


export default useRosterDataStore;
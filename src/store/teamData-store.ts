import axios from 'axios';

import create from 'zustand';

interface TeamDataStoreType {
  teamData: TeamInfoType | null;
  fetchTeamData: (slugId: string | undefined, teamId: string | undefined)
    => Promise<TeamInfoType>
}

const useTeamDataStore = create<TeamDataStoreType>(set => ({
  teamData: null,
  fetchTeamData: async (slugId, teamId) => {
    try {
      const responseTeam = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/teams/${teamId}`);
      set({ teamData: responseTeam.data.team })
      return responseTeam.data.team
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useTeamDataStore;
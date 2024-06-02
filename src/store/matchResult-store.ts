import create from 'zustand';

import axios from 'axios';

interface MatchResultStoreType {
  matchResultData: MatchResultType | null;
  fetchMatchResultData: (slugId: string | undefined, gameId: string | undefined)
    => Promise<MatchResultType>
}

const useMatchResultDataStore = create<MatchResultStoreType>(set => ({
  matchResultData: null,
  fetchMatchResultData: async (slugId, gameId) => {
    const responseMatchResult = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/summary?event=${gameId}`);
    set({ matchResultData: responseMatchResult.data })
    return responseMatchResult.data;
  }
}));


export default useMatchResultDataStore;
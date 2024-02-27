import axios from 'axios';
import create from 'zustand';
import { NewsStoreType } from './types/newsTypes';

const useNewsStore = create<NewsStoreType>(set => ({
  newsData: [],
  fetchNewsData: async (slugId) => {
    try {
      const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slugId}/news`);
      const data = response.data.articles
      set({ newsData: data })
      return response.data.articles
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

}));

export default useNewsStore;
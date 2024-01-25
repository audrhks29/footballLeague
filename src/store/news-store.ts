import axios from 'axios';
import create from 'zustand';
import { NewsStore } from './types/newsTypes';

const useNewsStore = create<NewsStore>(set => ({
  newsData: [],
  fetchData: async () => {
    try {
      const response = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news`);
      const data = response.data.articles
      set({ newsData: data })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

}));

export default useNewsStore;
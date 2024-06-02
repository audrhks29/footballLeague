export type NewsStoreType = {
  newsData: NewsItemType[];
  fetchNewsData: (slugId: string | undefined) => Promise<NewsItemType[]>;
}


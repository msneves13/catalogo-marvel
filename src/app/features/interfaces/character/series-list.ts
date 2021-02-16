import { SeriesSummary } from '../common/series-summary';

export interface SeriesList {
  available: number;
  returned: number;
  collectionURI: string;
  items: SeriesSummary[];
}

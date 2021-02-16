import { ComicSummary } from '../common/comic-summary';

export interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicSummary[];
}

import { EventList } from '../common/event-list';
import { Image } from '../common/image';
import { StoryList } from '../common/story-list';
import { Url } from '../common/url';
import { ComicList } from './comic-list';
import { SeriesList } from './series-list';

export interface Character {
  id?: number;
  name?: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ComicList;
  stories?: StoryList;
  events?: EventList;
  series?: SeriesList;
}

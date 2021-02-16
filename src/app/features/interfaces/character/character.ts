import { ID } from '@datorama/akita';

import { EventList } from '../common/event-list';
import { Image } from '../common/image';
import { StoryList } from '../common/story-list';
import { Url } from '../common/url';
import { ComicList } from './comic-list';
import { SeriesList } from './series-list';

export interface Character {
  id: ID;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Image;
  comics: ComicList;
  stories: StoryList;
  events: EventList;
  series: SeriesList;
}

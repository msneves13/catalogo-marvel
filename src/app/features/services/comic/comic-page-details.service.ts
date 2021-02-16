import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { Character } from '../../interfaces/character/character';
import { CharacterDataWrapper } from '../../interfaces/character/character-data-wrapper';

const PRIV_KEY = process.env.PRIV_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const ts = new Date().getTime().toString();
const hash = crypto.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

@Injectable({
  providedIn: 'root',
})
export class ComicPageDetailsService {
  constructor(private http: HttpClient) {}

  getCharacterByComicId(id: ID | undefined, limit: string): Observable<Character[]> {
    return this.http
      .get<CharacterDataWrapper>(
        `https://gateway.marvel.com:443/v1/public/comics/${id}/characters`,
        {
          params: {
            ts: ts,
            hash: hash,
            limit: limit,
            apikey: PUBLIC_KEY,
          },
        },
      )
      .pipe(map(comics => comics.data.results));
  }
}

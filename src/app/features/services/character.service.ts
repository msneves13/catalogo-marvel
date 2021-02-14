import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CharacterDataWrapper } from '../interfaces/characters/character-data-wrapper';
import { CharacterPageStore } from '../pages/character-page/state/character-page.store';

const PRIV_KEY = '7d811be99493eac46bc2b2378a31b3402128b09b';
const PUBLIC_KEY = 'f53f41391f3f52168a33657013ab7989';
const ts = new Date().getTime().toString();
const hash = crypto.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private http: HttpClient,
    private characterPageStore: CharacterPageStore,
  ) {}

  getCharacters(pageIndex: string, pageSize: string): Observable<void> {
    return this.http
      .get<CharacterDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: pageSize,
            offset: pageIndex,
          },
        },
      )
      .pipe(
        tap(() => this.characterPageStore.setLoading(true)),
        map(characters => this.characterPageStore.set({ characters })),
        finalize(() => this.characterPageStore.setLoading(false)),
      );
  }

  getCharactersBySearch(
    pageIndex: string,
    pageSize: string,
    nameStartsWith: string,
  ): Observable<void> {
    return this.http
      .get<CharacterDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: pageSize,
            offset: pageIndex,
            nameStartsWith: nameStartsWith,
          },
        },
      )
      .pipe(
        tap(() => this.characterPageStore.setLoading(true)),
        map(characters => this.characterPageStore.set({ characters })),
        finalize(() => this.characterPageStore.setLoading(false)),
      );
  }

  getCharacterById(id: string): Observable<void> {
    return this.http
      .get<CharacterDataWrapper>(
        `https://gateway.marvel.com:443/v1/public/characters/${id}`,
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
          },
        },
      )
      .pipe(
        tap(() => this.characterPageStore.setLoading(true)),
        map(characters => this.characterPageStore.set({ characters })),
        finalize(() => this.characterPageStore.setLoading(false)),
      );
  }
}

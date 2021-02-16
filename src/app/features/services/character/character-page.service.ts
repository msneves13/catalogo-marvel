import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { CharacterDataWrapper } from '../../interfaces/character/character-data-wrapper';
import {
    CharacterPageStore
} from '../../pages/character/character-page/state/character-page.store';

const PRIV_KEY = process.env.PRIV_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const ts = new Date().getTime().toString();
const hash = crypto.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

@Injectable({
  providedIn: 'root',
})
export class CharacterPageService {
  constructor(
    private http: HttpClient,
    private characterPageStore: CharacterPageStore,
  ) {}

  public getCharacters(): Observable<CharacterDataWrapper> {
    return this.http
      .get<CharacterDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: `${this.characterPageStore.getValue().ui.limit}`,
            offset: `${
              this.characterPageStore.getValue().ui.currentPage *
              this.characterPageStore.getValue().ui.limit
            }`,
          },
        },
      )
      .pipe(
        take(1),
        tap(characters => {
          this.characterPageStore.set(characters.data.results);
          this.characterPageStore.updateTotal(characters.data.total);
          this.characterPageStore.updateNameStartsWith('');
        }),
      );
  }

  public getCharactersBySearch(
    nameStartsWith: string,
  ): Observable<CharacterDataWrapper> {
    return this.http
      .get<CharacterDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: `${this.characterPageStore.getValue().ui.limit}`,
            offset: `${
              this.characterPageStore.getValue().ui.currentPage *
              this.characterPageStore.getValue().ui.limit
            }`,
            nameStartsWith: nameStartsWith,
          },
        },
      )
      .pipe(
        take(1),
        tap(characters => {
          this.characterPageStore.set(characters.data.results);
          this.characterPageStore.updateTotal(characters.data.total);
          this.characterPageStore.updateNameStartsWith(nameStartsWith);
        }),
      );
  }

  public getCharacterById(id: string): Observable<CharacterDataWrapper> {
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
        take(1),
        tap(characters => {
          this.characterPageStore.upsertMany(characters.data.results);
          this.characterPageStore.setActive(id);
        }),
      );
  }

  public resetCurrentPage(): void {
    this.characterPageStore.resetCurrentPage();
  }

  public nextPage(): void {
    if (
      (this.characterPageStore.getValue().ui.currentPage + 1) *
        this.characterPageStore.getValue().ui.limit <
      this.characterPageStore.getValue().ui.total
    ) {
      this.characterPageStore.updateCurrentPage(
        this.characterPageStore.getValue().ui.currentPage + 1,
      );
    }
  }

  public previousPage(): void {
    if (this.characterPageStore.getValue().ui.currentPage > 0) {
      this.characterPageStore.updateCurrentPage(
        this.characterPageStore.getValue().ui.currentPage - 1,
      );
    }
  }

  public setActive(id: ID): void {
    this.characterPageStore.setActive(id);
  }
}

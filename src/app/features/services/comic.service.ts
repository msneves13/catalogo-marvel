import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ComicDataWrapper } from '../interfaces/comics/comic-data-wrapper';
import { ComicPageStore } from '../pages/comic-page/state/comic-page.store';

const PRIV_KEY = '7d811be99493eac46bc2b2378a31b3402128b09b';
const PUBLIC_KEY = 'f53f41391f3f52168a33657013ab7989';
const ts = new Date().getTime().toString();
const hash = crypto.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  constructor(
    private http: HttpClient,
    private comicPageStore: ComicPageStore,
  ) {}

  getComics(pageIndex: string, pageSize: string): Observable<void> {
    return this.http
      .get<ComicDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/comics',
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
        tap(() => this.comicPageStore.setLoading(true)),
        map(comics => this.comicPageStore.set({ comics })),
        finalize(() => this.comicPageStore.setLoading(false)),
      );
  }

  getComicsBySearch(
    pageIndex: string,
    pageSize: string,
    nameStartsWith: string,
  ): Observable<void> {
    return this.http
      .get<ComicDataWrapper>(
        'https://gateway.marvel.com:443/v1/public/comics',
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
            limit: pageSize,
            offset: pageIndex,
            titleStartsWith: nameStartsWith,
          },
        },
      )
      .pipe(
        tap(() => this.comicPageStore.setLoading(true)),
        map(comics => this.comicPageStore.set({ comics })),
        finalize(() => this.comicPageStore.setLoading(false)),
      );
  }

  getComicById(id: string): Observable<void> {
    return this.http
      .get<ComicDataWrapper>(
        `https://gateway.marvel.com:443/v1/public/comics/${id}`,
        {
          params: {
            ts: ts,
            hash: hash,
            apikey: PUBLIC_KEY,
          },
        },
      )
      .pipe(
        tap(() => this.comicPageStore.setLoading(true)),
        map(comics => this.comicPageStore.set({ comics })),
        finalize(() => this.comicPageStore.setLoading(false)),
      );
  }
}

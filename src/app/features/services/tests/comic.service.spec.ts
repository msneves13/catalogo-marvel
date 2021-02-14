/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { ComicService } from '../comic.service';

describe('Service: Comic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComicService]
    });
  });

  it('should ...', inject([ComicService], (service: ComicService) => {
    expect(service).toBeTruthy();
  }));
});

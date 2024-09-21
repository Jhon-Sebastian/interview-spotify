import { inject, Injectable } from '@angular/core';
import { API_URL_SPOTIFY } from '../../../core/providers/core.provider';
import { Observable } from 'rxjs';

import {
  APISpotify,
  TracksItem,
} from '../../../shared/interfaces/dashboard/api-spotity.interface';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _http = inject(HttpService);
  private _apiUrl = inject(API_URL_SPOTIFY);

  searchItemSpotify(search: string): Observable<APISpotify> {
    const searchCleaned = this.cleanWhiteSpaces(search);
    const filters =
      '&type=artist%2Calbum%2Ctrack%2Cshow&include_external=audio';
    return this._http.doGet(
      `${this._apiUrl}search?q=${searchCleaned}${filters}`
    );
  }

  getTrackById(id: string): Observable<TracksItem> {
    return this._http.doGet(`${this._apiUrl}tracks/${id}`);
  }

  private cleanWhiteSpaces(search: string) {
    return search.replace('', '+');
  }
}

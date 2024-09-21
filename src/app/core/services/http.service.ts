import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private _localStorageService = inject(LocalStorageService);

  public createDefaultOptions(): Options {
    const token = this._localStorageService.getAccessToken();
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };
  }

  public doGet<T>(serviceUrl: string): Observable<T> {
    const ropts = this.createDefaultOptions();
    return this.http.get<T>(serviceUrl, ropts);
  }

  public doPost<T, R>(serviceUrl: string, body: T): Observable<R> {
    const ropts = this.createDefaultOptions();
    return this.http.post<R>(serviceUrl, body, ropts);
  }

  public doPath<T, R>(serviceUrl: string, body?: T): Observable<R> {
    const ropts = this.createDefaultOptions();
    return this.http.patch<R>(serviceUrl, body, ropts);
  }

  public doDelete<R>(serviceUrl: string): Observable<R> {
    const ropts = this.createDefaultOptions();
    return this.http.delete<R>(serviceUrl, ropts);
  }
}

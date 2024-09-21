import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.develop';
import { Params, Router } from '@angular/router';
import { ResponseTypeSpotify } from '../utils/response-type-spotify.enum';
import { LocalStorageService } from './local-storage.service';
import { ResponseTokenAuthenticator } from '../interfaces/response-token-authenticator';

@Injectable({ providedIn: 'root' })
export class SpotifyAuthService {
  private _defaultScope = signal(environment.spotify.defaultScopes);
  private _authenticationUrl = signal(
    new URL(environment.spotify.urlCodeVerifier)
  );
  private _localStorageService = inject(LocalStorageService);
  private _router = inject(Router);

  async login(): Promise<void> {
    this.resetLocalStorage();
    const codeVerifier = this.generateRandomString(64);
    const hashed = await this.sha256(codeVerifier);
    const codeChallenge = this.base64encode(hashed);

    this._localStorageService.setCodeVerifier(codeVerifier);
    const params = {
      response_type: ResponseTypeSpotify.CODE,
      client_id: environment.spotify.clientId,
      scope: this._defaultScope(),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: environment.spotify.urlRedirect,
    };
    this._authenticationUrl().search = new URLSearchParams(params).toString();
    window.location.href = this._authenticationUrl().toString();
  }

  private resetLocalStorage() {
    this._localStorageService.removeCode();
    this._localStorageService.removeCodeVerifier();
    this._localStorageService.removeAccessToken();
  }

  private generateRandomString(length: number): string {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }

  private async sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  async configurateTokenRequest(params: Params) {
    if (!this._localStorageService.getCode()) {
      const code = params[ResponseTypeSpotify.CODE];
      this._localStorageService.setCode(code);

      this.buildBodyRequestToken(code);
    }
  }

  private async buildBodyRequestToken(code: string) {
    const codeVerifier = this._localStorageService.getCodeVerifier();
    if (codeVerifier) {
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: environment.spotify.clientId,
          grant_type: ResponseTypeSpotify.GRAN_TYPE,
          code,
          redirect_uri: environment.spotify.urlRedirect,
          code_verifier: codeVerifier,
        }),
      };
      await this.getToken(payload);
    }
  }

  private async getToken(payload: any) {
    try {
      const body = await fetch(environment.spotify.urlAuthentication, payload);
      const response: ResponseTokenAuthenticator = await body.json();
      this._localStorageService.setAccessToken(response.access_token);
    } catch (e) {
      this._router.navigateByUrl('/auth/login');
      alert(
        'Ocurrio un error al querer obtener las credenciacles, por favor ingrese de nuevo'
      );
    }
  }
}

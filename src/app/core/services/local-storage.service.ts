import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../utils/local-storage-keys.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getCodeVerifier(): string | null {
    return localStorage.getItem(LocalStorageKeys.CODE_VERIFIER);
  }
  getCode(): string | null {
    return localStorage.getItem(LocalStorageKeys.CODE);
  }

  getAccessToken() {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  setCodeVerifier(codeVerifier: string): void {
    if (!this.getCodeVerifier()) {
      localStorage.setItem(LocalStorageKeys.CODE_VERIFIER, codeVerifier);
    }
  }

  setCode(code: string): void {
    if (!this.getCode()) {
      localStorage.setItem(LocalStorageKeys.CODE, code);
    }
  }

  setAccessToken(accessToken: string) {
    if (!this.getAccessToken()) {
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessToken);
    }
  }

  removeCodeVerifier(): void {
    localStorage.removeItem(LocalStorageKeys.CODE_VERIFIER);
  }

  removeCode(): void {
    localStorage.removeItem(LocalStorageKeys.CODE);
  }

  removeAccessToken() {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
  }

}

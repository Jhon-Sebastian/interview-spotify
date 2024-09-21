import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';
import { environment } from '../../../environments/environment.develop';

export const API_URL_SPOTIFY = new InjectionToken('API_URL_SPOTIFY');

export const provideCore = (): Provider[] | EnvironmentProviders[] => {
  return [
    { provide: API_URL_SPOTIFY, useValue: environment.spotify.apiSpotify },
  ];
};

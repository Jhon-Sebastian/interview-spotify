export const environment = {
  production: false,
  spotify: {
    clientId: '547f391e0cdc4982bc68a7684eaa0723',
    clientSecret: '3209e78878774cebb924d6f9535c6795',
    urlRedirect: 'http://localhost:4200/dashboard',
    urlCodeVerifier: 'https://accounts.spotify.com/authorize',
    urlAuthentication: 'https://accounts.spotify.com/api/token',
    defaultScopes: 'user-read-private user-read-email',
    apiSpotify: 'https://api.spotify.com/v1/'
  },
};

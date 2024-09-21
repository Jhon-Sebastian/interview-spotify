export type APISpotify = {
  albums: Albums;
  artists: Artists;
  tracks: Tracks;
  shows: Shows;
};

export type Albums = {
  href: string;
  items: AlbumElement[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

export type AlbumElement = {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
};

export enum AlbumTypeEnum {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single',
}

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export enum ArtistType {
  Artist = 'artist',
}

export type Image = {
  height: number;
  url: string;
  width: number;
};

export enum ReleaseDatePrecision {
  Day = 'day',
}

export type Artists = {
  href: string;
  items: ArtistsItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

export type ArtistsItem = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: ArtistType;
  uri: string;
};

export type Followers = {
  href: null;
  total: number;
};

export type Shows = {
  href: string;
  items: ShowsItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

export type ShowsItem = {
  available_markets: string[];
  copyrights: any[];
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  html_description: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: Language[];
  media_type: MediaType;
  name: string;
  publisher: string;
  total_episodes: number;
  type: PurpleType;
  uri: string;
};

export enum Language {
  Es = 'es',
  EsCO = 'es-CO',
  EsDO = 'es-DO',
  EsMX = 'es-MX',
}

export enum MediaType {
  Audio = 'audio',
  Mixed = 'mixed',
}

export enum PurpleType {
  Show = 'show',
}

export type Tracks = {
  href: string;
  items: TracksItem[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};

export type TracksItem = {
  album: AlbumElement;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: FluffyType;
  uri: string;
};

export type ExternalIDS = {
  isrc: string;
};

export enum FluffyType {
  Track = 'track',
}

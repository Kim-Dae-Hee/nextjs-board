export type OAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type HomeUser = OAuthUser & {
  bookmarks: string[];
}
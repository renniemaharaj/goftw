export interface PutSitePayload {
  site: string;
  apps: string[];
}

export interface PutSiteResponse {
  site: string;
  apps: string[];
  url: string;

}

export type App = {
    name: string,
    description: string,
}

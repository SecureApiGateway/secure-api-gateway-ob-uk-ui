export interface ISession {
  latestAccessTime: string;
  maxIdleExpirationTime: string;
  maxSessionExpirationTime: string;
  properties: unknown;
  realm: string;
  universalId: string;
  username: string;
}

export interface ISessionState {
  loading: boolean;
  session: null | ISession;
}

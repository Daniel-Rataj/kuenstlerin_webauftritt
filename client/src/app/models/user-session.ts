import { User } from "./user";

export interface UserSession {
  token: string;           // Access Token (JWT)
  refreshToken: string;    // Refresh Token (lang gültig)
  user: User;
}
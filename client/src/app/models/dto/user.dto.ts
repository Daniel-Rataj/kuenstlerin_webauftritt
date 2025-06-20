import { UserRole } from "../enums/user-role";

export interface UserDto {
  id?: string;
  username: string;
  password: string;
  role: UserRole;
}
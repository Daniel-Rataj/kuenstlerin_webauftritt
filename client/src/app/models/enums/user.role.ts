export enum UserRole {
  Admin = 0,
  Moderator = 1
}

// Utility functions for type conversion
export namespace UserRole {
  export function toString(role: UserRole): string {
    return UserRole[role]; // Converts 0 -> "Admin", 1 -> "Moderator"
  }

  export function fromString(roleString: string): UserRole {
    return (UserRole as any)[roleString]; // "Admin" -> 0
  }
}
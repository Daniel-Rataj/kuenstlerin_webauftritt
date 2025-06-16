export enum UserRole {
  Initialized = 0,
  Admin = 1,
  Moderator = 2,
  Editor = 3,
}

// Utility functions for type conversion
export namespace UserRole {
  export function toString(role: UserRole): string {
    return UserRole[role]; // Converts 0 -> "Initialized", 1 -> "Admin"
  }

  export function fromString(roleString: string): UserRole {
    return (UserRole as any)[roleString]; // "Initialized" -> 0
  }
}

export enum ExhibitionStatus {
  Initialized = 0,
  Draft = 1,
  Public = 2
}

// Utility functions for type conversion
export namespace ExhibitionStatus {
  export function toString(status: ExhibitionStatus): string {
    return ExhibitionStatus[status]; // Converts 0 -> "Initialized", 1 -> "Draft"
  }

  export function fromString(statusString: string): ExhibitionStatus {
    return (ExhibitionStatus as any)[statusString]; // "Initialized" -> 0
  }
}
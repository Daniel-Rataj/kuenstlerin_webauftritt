import { ExhibitionStatus } from "../enums/exhibition-status";
import { ExhibitionElement } from "./exhibition-element.dto";

export interface ExhibitionDto {
  id?: number;
  title: string;
  date?: Date;
  exhibitionElements: ExhibitionElement[];
  status: ExhibitionStatus;
}

export namespace ExhibitionDto {
  export function createEmptyExhibition(): ExhibitionDto {
    const empty: ExhibitionDto = {
      status: ExhibitionStatus.Draft,
      title: '',
      exhibitionElements: [],
    };
    return empty;
  }
}
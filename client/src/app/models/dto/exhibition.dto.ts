import { ExhibitionElement } from "../exhibition-element";

export interface ExhibitionDto {
  id?: number;
  title: string;
  date: Date;
  exhibitionElements: ExhibitionElement[];
}
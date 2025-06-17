import { ExhibitionElement } from "../exhibition-element";


export { ExhibitionElement };
export interface ExhibitionDto {
  id?: number;
  title: string;
  date: Date;
  exhibitionElements: ExhibitionElement[];
}
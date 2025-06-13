import { ExhibitionElement } from "./exhibition-element";

export interface Exhibition {
  id: number;
  title: string;
  date: Date;
  exhibitionElements: ExhibitionElement[];
}
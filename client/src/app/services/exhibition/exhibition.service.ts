import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Exhibition } from '../../models/exhibition';
import { ExhibitionDto } from '../../models/dto/exhibition.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExhibitionService extends BaseService<Exhibition, ExhibitionDto> {
  
  constructor(http: HttpClient) {
    super(http, 'exhibition');
  }

  getExhibitionsDummy(): Exhibition[] {
    // Dummy Exhibition 1
    let exh1: Exhibition = {
      id: 1,
      title: "Ausstellung 1",
      date: new Date(2025, 1, 1),
      exhibitionElements: [
        {
            id: 1,
            name: 'Bild 1 (A1)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition1/1.jpg',
            availableToBuy: true,
            priceTag: 100
          },
          {
            id: 2,
            name: 'Bild 2 (A1)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition1/2.jpg',
            availableToBuy: false,
          }
      ] 
    };

    // Dummy Exhibition 2
    let exh2: Exhibition = {
      id: 2,
      title: "Ausstellung 2",
      date: new Date(2025, 4, 20),
      exhibitionElements: [
        {
            id: 1,
            name: 'Bild 1 (A2)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition2/4_1.jpg',
            availableToBuy: true,
            priceTag: 200
          },
          {
            id: 2,
            name: 'Bild (A2)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition2/4.jpg',
            availableToBuy: true,
            priceTag: 300
          }
      ] 
    };

    // Dummy Exhibition 2
    let exh3: Exhibition = {
      id: 3,
      title: "Ausstellung 3",
      date: new Date(2025, 4, 20),
      exhibitionElements: [
        {
            id: 1,
            name: 'Bild 1 (A3)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition3/5.jpg',
            availableToBuy: true,
            priceTag: 150
          },
          {
            id: 2,
            name: 'Bild 2 (A3)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition3/28.jpg',
            availableToBuy: false,
          },
          {
            id: 2,
            name: 'Bild 3 (A3)',
            description: 'Testbeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            imageUrl: '/uploads/exhibition3/31.jpg',
            availableToBuy: false,
          }
      ] 
    };

    return [exh1, exh2, exh3];
  }
}

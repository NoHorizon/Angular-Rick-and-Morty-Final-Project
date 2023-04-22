import { Component, OnInit } from '@angular/core';
import { RickAndMortyApiService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickAndMortyApiService: RickAndMortyApiService) {}

  ngOnInit(): void {
    this.rickAndMortyApiService.getAllCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }
}

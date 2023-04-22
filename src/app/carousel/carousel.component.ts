import { Component, OnInit } from '@angular/core';
import { RickAndMortyApiService } from '../services/rick-and-morty.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  characters: any[] = [];

  constructor(private rickAndMortyApiService: RickAndMortyApiService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.rickAndMortyApiService.getAllCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.shuffleArray(this.characters);
    });
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

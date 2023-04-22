import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RickAndMortyApiService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  characters: any[] = [];

  constructor(
    private rickAndMortyApiService: RickAndMortyApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rickAndMortyApiService.getAllCharacters().subscribe((data: any) => {
      this.characters = data.results;
    });
  }

  showAlters(name: string): void {
    this.rickAndMortyApiService.getCharacterByName(name).subscribe((data: any) => {
      this.router.navigate(['/alters'], { state: { characters: data.results } });
    });
  }
}

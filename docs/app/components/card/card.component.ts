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
  filteredCharacters: any[] = [];
  name: string = '';
  gender: string = 'All genders';

  constructor(
    private rickAndMortyApiService: RickAndMortyApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rickAndMortyApiService.getAllCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.filteredCharacters = data.results;
    });
  }

  filterCharacters(): void {
    this.filteredCharacters = this.characters.filter((character: any) => {
      return (
        character.name.toLowerCase().includes(this.name.toLowerCase()) &&
        (this.gender === 'All genders' || character.gender === this.gender)
      );
    });
  }

  showAlters(name: string): void {
    this.rickAndMortyApiService
      .getCharacterByName(name)
      .subscribe((data: any) => {
        this.router.navigate(['/alters'], {
          state: { characters: data.results },
        });
      });
  }
}

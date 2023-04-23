import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RickAndMortyApiService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-alters',
  templateUrl: './alters.component.html',
  styleUrls: ['./alters.component.css'],
})
export class AltersComponent implements OnInit {
  characters: any[] = [];
  firstName: string = '';

  filteredCharacters: any[] = [];
  name: string = '';
  gender: string = 'All genders';

  constructor(
    private rickAndMortyApiService: RickAndMortyApiService,
    private route: ActivatedRoute
  ) {}

  filterCharacters(): void {
    this.filteredCharacters = this.characters.filter((character: any) => {
      return (
        character.name.toLowerCase().includes(this.name.toLowerCase()) &&
        (this.gender === 'All genders' || character.gender === this.gender)
      );
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.firstName = params['name'];
      this.getCharactersByName(this.firstName);
    });

    // Display all characters by default
    this.filterCharacters();
  }

  getCharactersByName(name: string): void {
    this.rickAndMortyApiService
      .getCharacterByName(name)
      .subscribe((data: any) => {
        this.characters = data.results;
        console.log('characters:', this.characters);
        this.filterCharacters();
      });
  }
}

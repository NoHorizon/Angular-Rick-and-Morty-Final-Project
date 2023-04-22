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

  constructor(
    private rickAndMortyApiService: RickAndMortyApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.firstName = params['name'];
      this.getCharactersByName(this.firstName);
    });
  }

  getCharactersByName(name: string): void {
    this.rickAndMortyApiService
      .getCharacterByName(name)
      .subscribe((data: any) => {
        this.characters = data.results;
        console.log('characters:', this.characters);
      });
  }
}

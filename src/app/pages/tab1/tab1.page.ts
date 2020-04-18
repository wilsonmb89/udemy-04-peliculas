import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  peliculasPopulares: Pelicula[] = [];

  constructor(
    private _moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.getMonthPremiers();
    this.getPopularMovies();
  }

  getMonthPremiers() {
    const currentMonth = String(new Date().getMonth() + 1);
    this._moviesService.getMonthPremiers(currentMonth.length === 2 ? currentMonth : ('0' + currentMonth) ).subscribe(
      res => {
        this.peliculasRecientes.push(...res.results);
      }
    );
  }

  async getPopularMovies(page?: number) {
    page = page || 1;
    this._moviesService.getPopularMovies(page).subscribe(
      res => {
        const tempPopulares = [...this.peliculasPopulares, ...res.results]; // Debido al pipe asyncrono de pares
        this.peliculasPopulares = tempPopulares;
      }
    );
  }

  getNextPagePopulares(page: number) {
    this.getPopularMovies(page);
  }
}

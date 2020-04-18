import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { DetailMovieModalService } from 'src/app/services/detail-movie-modal.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculasFavoritos: DetallePelicula[] = [];
  moviesGenres: Genre[] = [];
  dataGenders: any[] = [];

  constructor(
    private _dataLocalService: DataLocalService,
    private _detailMovieModalService: DetailMovieModalService,
    private _moviesService: MoviesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getMoviesGenres();
  }

  async loadFavMovies() {
    this.peliculasFavoritos = await this._dataLocalService.getFavorites();
  }

  async openDetail(movieId: string) {
    const {data} = await this._detailMovieModalService.createModal(movieId);
    this.getMoviesGenres();
  }

  async getMoviesGenres() {
    this.dataGenders = [];
    await this.loadFavMovies();
    this._moviesService.getMoviesGenres().subscribe(
      res => {
        res.genres.forEach(
          genreFind => {
            if (this.movieHasGenre(genreFind.id)) {
              const favsMoviesByGenre = this.getFavsMoviesByGenre(genreFind.id);
              this.dataGenders.push({genre: genreFind, favsMovies: favsMoviesByGenre});
            }
          }
        );
        console.log(this.dataGenders);
      }
    );
  }

  movieHasGenre(genreId: number): boolean {
    const favsSize = this.peliculasFavoritos.length;
    for (let x = 0 ; x < favsSize ; x++) {
      const favMovie = this.peliculasFavoritos[x];
      const favMovieHasGenre = !!(favMovie.genres.find(movieGenre => movieGenre.id === genreId));
      if (favMovieHasGenre) {
        return true;
      }
    }
    return false;
  }

  getFavsMoviesByGenre(genreId: number) {
    const favsByGenre = [];
    const favsSize = this.peliculasFavoritos.length;
    for (let x = 0 ; x < favsSize ; x++) {
      const favMovie = this.peliculasFavoritos[x];
      const favMovieHasGenre = !!(favMovie.genres.find(movieGenre => movieGenre.id === genreId));
      if (favMovieHasGenre) {
        favsByGenre.push(favMovie);
      }
    }
    return favsByGenre;
  }
}

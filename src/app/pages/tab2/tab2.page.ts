import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailMovieModalService } from 'src/app/services/detail-movie-modal.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('infiniteScrollSearch', {static: false}) infiniteScrollSearch: IonInfiniteScroll;

  textoBuscar: string;
  resultadoPeliculas: Pelicula[] = [];
  showLoading: boolean;
  currentPage: number;

  constructor(
    private _moviesService: MoviesService,
    private _detailMovieModalService: DetailMovieModalService
  ) {}

  ngOnInit() {
    this.textoBuscar = '';
    this.showLoading = false;
    this.currentPage = 1;
  }

  buscar(ev: any) {
    this.textoBuscar = ev.detail.value;
    this.resultadoPeliculas = [];
    this.currentPage = 1;
    this.infiniteScrollSearch.disabled = false;
    this.showLoading = false;
    this.searchMovies(this.textoBuscar);
  }

  searchMovies(query: string, page?: number) {
    if (!!query) {
      page = !!page ? page : 1;
      this.showLoading = true;
      this._moviesService.searchMoviesByQuery(query, page).subscribe(
        res => {
          if (res.results.length > 0) {
            const tempArray = [...this.resultadoPeliculas, ...res.results];
            this.resultadoPeliculas = tempArray;
          } else {
            this.infiniteScrollSearch.disabled = true;
          }
          this.showLoading = false;
        },
        error => {
          console.error('Error:', error);
          this.showLoading = false;
        }
      );
    }
  }

  async openDetail(movieId: string) {
    const data = await this._detailMovieModalService.createModal(movieId);
  }

  loadNextPage(ev: any) {
    setTimeout(() => {
      this.searchMovies(this.textoBuscar, ++this.currentPage);
      ev.target.complete();
    }, 1000);
  }
}

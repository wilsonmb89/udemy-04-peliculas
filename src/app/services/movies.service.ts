import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MOVIES_PATH } from '../utils/constants/servicePath.constant';
import { Idioma, TipoOrdenamiento, ParametrosUtils } from '../utils/constants/utilData.constant';

const httpHeaders = new HttpHeaders({
  Authorization: environment.moviesApiAuthorization
});

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  private getHttp<T>(url: string) {
    return this._httpClient.get<T>(url, {headers: httpHeaders});
  }

  private getMoviesDBUrl(): string {
    return `${MOVIES_PATH.MOVIES_API_URL}`;
  }

  getMonthPremiers(month: string) {
    const year = new Date().getFullYear();
    return this.getHttp<MoviesResponse>(
      this.getMoviesDBUrl()
      .concat(`${MOVIES_PATH.DISCOVER_PARAM}`).concat(`${MOVIES_PATH.MOVIE_PARAM}`)
      .concat(`?${MOVIES_PATH.DATE_REL_INIT}`).concat(`${year}-${month}-01`)
      .concat(`&${MOVIES_PATH.DATE_REL_END}`).concat(`${year}-${month}-30`)
      .concat(`&${MOVIES_PATH.LANGUAGE}`).concat(`${Idioma.español}`)
    );
  }

  getPopularMovies(page: number) {
    return this.getHttp<MoviesResponse>(
      this.getMoviesDBUrl()
      .concat(`${MOVIES_PATH.DISCOVER_PARAM}`).concat(`${MOVIES_PATH.MOVIE_PARAM}`)
      .concat(`?${MOVIES_PATH.LANGUAGE}`).concat(`${Idioma.español}`)
      .concat(`&${MOVIES_PATH.SORT_BY_PARAM}`).concat(`${TipoOrdenamiento.popularidadDesc}`)
      .concat(`&${MOVIES_PATH.PAGE_PARAM}`).concat(`${page}`)
    );
  }

  getMovieDetails(movieId: number) {
    return this.getHttp<DetallePelicula>(
      this.getMoviesDBUrl()
      .concat(`${MOVIES_PATH.MOVIE_PARAM}`).concat(`/${movieId}`)
      .concat(`?${MOVIES_PATH.LANGUAGE}`).concat(`${Idioma.español}`)
    );
  }

  getMovieCharacters(movieId: number) {
    return this.getHttp<CreditosPelicula>(
      this.getMoviesDBUrl()
      .concat(`${MOVIES_PATH.MOVIE_PARAM}`).concat(`/${movieId}/${ParametrosUtils.credits}`)
    );
  }

  searchMoviesByQuery(query: string, page: number) {
    return this.getHttp<MoviesResponse>(
      this.getMoviesDBUrl()
      .concat(`${ParametrosUtils.search}/`).concat(`${ParametrosUtils.movie}`)
      .concat(`?${MOVIES_PATH.LANGUAGE}`).concat(`${Idioma.español}`)
      .concat(`&${MOVIES_PATH.INCLUDE_ADULT_PARAM}`).concat(`true`)
      .concat(`&${MOVIES_PATH.PAGE_PARAM}`).concat(`${page}`)
      .concat(`&${MOVIES_PATH.QUERY_PARAM}`).concat(`${query}`)
    );
  }

  getMoviesGenres() {
    return this.getHttp<MoviesGenres>(
      this.getMoviesDBUrl()
      .concat(`${ParametrosUtils.genre}/`)
      .concat(`${ParametrosUtils.movie}/`)
      .concat(`${ParametrosUtils.list}`)
      .concat(`?${MOVIES_PATH.LANGUAGE}`).concat(`${Idioma.español}`)
      .concat(`&${MOVIES_PATH.IMG_LANGUAGE}`).concat(`${Idioma.español}`)
    );
  }
}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(
    private _storage: Storage
  ) { }

  async getFavorites() {
    const favoritos = await this._storage.get('favoritos_moviesApp');
    return favoritos || [];
  }

  async saveFavoritos(movieDetail: DetallePelicula) {
    const favoritosCurr = await this.getFavorites();
    const favoritosSave = favoritosCurr.filter((favMovie: DetallePelicula) => favMovie.id !== movieDetail.id);
    favoritosSave.push(movieDetail);
    await this._storage.set('favoritos_moviesApp', favoritosSave);
  }

  async deleteFavorito(movieDetail: DetallePelicula) {
    const favoritosCurr = await this.getFavorites();
    const favoritosSave = favoritosCurr.filter((favMovie: DetallePelicula) => favMovie.id !== movieDetail.id);
    await this._storage.set('favoritos_moviesApp', favoritosSave);
  }
}

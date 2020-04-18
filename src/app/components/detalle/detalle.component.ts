import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() movieId: number;

  detallePelicula: DetallePelicula;
  actoresPelicula: Cast[];
  leerMasLenght = 150;
  optsSlidesActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private _modalController: ModalController,
    private _moviesService: MoviesService,
    private _dataLocalService: DataLocalService,
    private _toastController: ToastController
  ) { }

  ngOnInit() {
    this.getDataMovie();
  }

  getDataMovie() {
    this._moviesService.getMovieDetails(this.movieId).subscribe(
      async movieDetailRs => {
        const favoritosCurr = await this._dataLocalService.getFavorites();
        movieDetailRs.isFavorite = !!(favoritosCurr.find((movieFavSave: DetallePelicula) => movieFavSave.id === this.movieId));
        this.detallePelicula = movieDetailRs;
        this._moviesService.getMovieCharacters(this.movieId).subscribe(
          movieCharactersRs => {
            this.actoresPelicula = movieCharactersRs.cast;
          }
        );
      }
    );
  }

  closeModal() {
    this._modalController.dismiss({data: `Chaui ${this.movieId}`});
  }

  toggleLeerMas() {
    if (!!this.detallePelicula && !!this.detallePelicula.overview) {
      this.leerMasLenght = (this.leerMasLenght !== 150) ? 150 : this.detallePelicula.overview.length ;
    }
  }

  async toggleFavorites() {
    if (!!this.detallePelicula.isFavorite) {
      this._dataLocalService.deleteFavorito(this.detallePelicula);
      this.detallePelicula.isFavorite = false;
    } else {
      this._dataLocalService.saveFavoritos(this.detallePelicula);
      this.detallePelicula.isFavorite = true;
    }
    this.showToast('Hecho!');
  }

  async showToast(mensaje: string, duracion?: number) {
    duracion = duracion || 1000;
    const toast = await this._toastController.create({
      message: mensaje,
      duration: duracion,
      cssClass: 'favorito-toast',
      mode: 'ios',
      animated: true,
      position: 'top'
    });
    toast.present();
  }
}

import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Injectable({
  providedIn: 'root'
})
export class DetailMovieModalService {

  constructor(
    private _modalController: ModalController
  ) { }

  async createModal(idMovie: string) {
    const detailMovieModal = await this._modalController.create({
      component: DetalleComponent,
      componentProps: {
        movieId: idMovie,
      }
    });
    await detailMovieModal.present();
    const {data} = await detailMovieModal.onWillDismiss();
    return data;
  }
}

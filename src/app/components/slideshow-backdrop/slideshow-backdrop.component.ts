import { Component, OnInit, Input } from '@angular/core';
import { DetailMovieModalService } from 'src/app/services/detail-movie-modal.service';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[];

  slidesOpts = {
    slidesPerView: 1.1,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(
    private _detailMovieModalService: DetailMovieModalService
  ) { }

  ngOnInit() {}

  async openDetail(movieId: string) {
    const data = await this._detailMovieModalService.createModal(movieId);
  }

}

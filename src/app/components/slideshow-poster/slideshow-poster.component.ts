import { Component, OnInit, Input } from '@angular/core';
import { DetailMovieModalService } from 'src/app/services/detail-movie-modal.service';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[];

  slidesOpts = {
    slidesPerView: 3.3,
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetailMovieModalService } from 'src/app/services/detail-movie-modal.service';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() peliculas: Pelicula[];
  @Output() getNextPageEmitter = new EventEmitter<number>();

  currentPage: number;

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };

  constructor(
    private _detailMovieModalService: DetailMovieModalService
  ) { }

  ngOnInit() {
    this.currentPage = 1;
  }

  getNextPage() {
    this.getNextPageEmitter.emit(++this.currentPage);
  }

  async openDetail(idMovie: string) {
    const data = await this._detailMovieModalService.createModal(idMovie);
  }
}

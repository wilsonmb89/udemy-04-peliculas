import { Pipe, PipeTransform } from '@angular/core';
import { MOVIES_PATH } from '../utils/constants/servicePath.constant';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    if (!img) {
      return './assets/images/no-image.jpg';
    }
    return `${MOVIES_PATH.IMAGE_URL}/${size}${img}`;
  }

}

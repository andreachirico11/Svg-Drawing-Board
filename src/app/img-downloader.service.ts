import { Injectable } from '@angular/core';
import { ImgFileType } from './ultils/fileType';

@Injectable({
  providedIn: 'root',
})
export class ImgDownloaderService {
  constructor() {}

  downloadImg(
    svg: SVGElement,
    fileType?: ImgFileType
  ): Promise<HTMLAnchorElement> {
    const width = 400,
      height = 400,
      blob = this.blobCreator(svg),
      url = this.objUrlCreator(blob);
    return this.canvasCreator(url, width, height)
      .then((canvas) => {
        const href = this.canvasToDataUrl(canvas, fileType || 'png');
        return this.linkElementCreator(href, 'prova');
      })
      .catch((err) => {
        alert(err);
        return null;
      });
  }

  linkElementCreator(href: string, fileName: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.download = fileName;
    link.style.opacity = '0';
    link.href = href;
    return link;
  }

  canvasCreator(
    src: string,
    width: number,
    height: number
  ): Promise<HTMLCanvasElement> {
    return new Promise((res, rej) => {
      let image = new Image();
      console.log('gianni');
      image.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        res(canvas);
      };
      image.onerror = rej;
      image.src = src;
    });
  }

  blobCreator(svg: SVGElement): Blob {
    let clonedSvgElement = (svg.cloneNode(true) as unknown) as Element;
    let outerHTML = clonedSvgElement.outerHTML;
    return new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  }

  objUrlCreator(elementToAttach: any): string {
    let URL = window.URL || window.webkitURL;
    return URL.createObjectURL(elementToAttach);
  }

  canvasToDataUrl(canvas: HTMLCanvasElement, imgFileType: ImgFileType): string {
    switch (imgFileType) {
      case 'jpeg':
        return canvas.toDataURL('image/jpg');
      case 'webp':
        return canvas.toDataURL('image/webp');
      default:
        return canvas.toDataURL();
    }
  }
}

import { Injectable } from '@angular/core';
import { ImgFileType } from '../ultils/fileType';
import { ReadyLink } from './readyLink';

@Injectable({
  providedIn: 'root',
})
export class ImgDownloaderService {
  private actualUrl = window.URL || window.webkitURL || (window as any);

  async downloadLinkCreator(
    svg: SVGElement,
    fileType: ImgFileType = 'png',
    filename: string
  ): Promise<ReadyLink> {
    const { width, height } = this.extractSvgDimension(svg);
    const src = this.actualUrl.createObjectURL(this.blobCreator(svg));
    const loadedImg = await this.imgLoader(src);
    const canvas = this.canvasCreator(loadedImg, width, height);
    const canvasDataUrl = this.canvasToDataUrl(canvas, fileType);
    return new ReadyLink(canvasDataUrl, filename);
  }

  imgLoader(src: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
      const img = new Image();
      img.addEventListener('load', () => {
        res(img);
      });
      img.addEventListener('error', rej);
      img.src = src;
    });
  }

  canvasCreator(
    image: HTMLImageElement,
    width: number,
    height: number
  ): HTMLCanvasElement {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  }

  blobCreator(svg: SVGElement): Blob {
    var data = new XMLSerializer().serializeToString(svg);
    // let clonedSvgElement = (svg.cloneNode(true) as unknown) as Element;
    // let outerHTML = clonedSvgElement.outerHTML;
    // return new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    return new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  }

  canvasToDataUrl(canvas: HTMLCanvasElement, imgFileType: ImgFileType): string {
    switch (imgFileType) {
      case 'jpeg':
        return canvas.toDataURL('image/jpeg');
      case 'webp':
        return canvas.toDataURL('image/webp');
      default:
        return canvas.toDataURL();
    }
  }

  extractSvgDimension(svg: SVGElement): { width: number; height: number } {
    return {
      width: Number(svg.attributes.getNamedItem('width').value),
      height: Number(svg.attributes.getNamedItem('height').value),
    };
  }
}

import { Injectable } from '@angular/core';
import { ImgFileType } from '../ultils/fileType';

@Injectable({
  providedIn: 'root',
})
export class ImgDownloaderService {
  URL = window.URL || window.webkitURL || (window as any);

  constructor() {}

  async downloadImg(
    svg: SVGElement,
    fileType: ImgFileType = 'png',
    filename: string = 'defaultName'
  ): Promise<void> {
    const { width, height } = this.extractSvgDimension(svg);
    const src = this.objUrlCreator(this.blobCreator(svg));
    const loadedImg = await this.imgLoader(src);
    const canvas = this.canvasCreator(loadedImg, width, height);
    const canvasDataUrl = this.canvasToDataUrl(canvas, fileType);
    const link = this.linkElementCreator(canvasDataUrl, filename);
    document.body.appendChild(link);
    if (confirm('download?')) {
      link.click();
    }
    link.remove();
    URL.revokeObjectURL(src);
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

  linkElementCreator(href: string, fileName: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = href;
    link.style.display = 'none';
    return link;
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

  objUrlCreator(elementToAttach: Blob): string {
    // let URL = window.URL || window.webkitURL || (window as any);
    return this.URL.createObjectURL(elementToAttach);
  }

  objectUrlRemover(url: string): void {
    let URL = window.URL || window.webkitURL || (window as any);
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
// //vecchio da buttare
// imgLoader(src: string): Promise<HTMLImageElement> {
//   return new Promise((res, rej) => {
//     const img = new Image();
//     img.onload = () => {
//       res(img);
//     };
//     img.onerror = rej;
//     img.src = src;
//   });
// }

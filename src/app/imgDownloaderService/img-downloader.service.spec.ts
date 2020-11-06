import { AfterViewInit, Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { ImgDownloaderService } from './img-downloader.service';
import { ImgFileType } from '../ultils/fileType';

describe('ImgDownloaderService', () => {
  let service: ImgDownloaderService, testCanvas: HTMLCanvasElement;
  const svgEl: SVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    ),
    sampleBlob = new Blob(['sample'], { type: 'text' }),
    testSvgFileLocation = '/assets/coronavirus.component.svg',
    badSvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svgEl.setAttribute('width', '400');
  svgEl.setAttribute('height', '400');
  /**
   *
   *
   *
   */
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent],
        providers: [ImgDownloaderService],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.get(ImgDownloaderService);
          testCanvas = service.canvasCreator(new Image(), 50, 50);
        });
    })
  );
  /**
   *
   *
   *
   *
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'expect blobCreator to create a url',
    waitForAsync(() => {
      const blob = service.blobCreator(svgEl);
      expect(blob.type).toEqual('image/svg+xml;charset=utf-8');
      blob.text().then((res) => {
        expect(res).toEqual(new XMLSerializer().serializeToString(svgEl));
      });
    })
  );

  it('create a canvas element', () => {
    expect(testCanvas.width).toBe(50);
  });

  it('imgLoader succesfully load real url and detects wrong ones', (done) => {
    service.imgLoader(testSvgFileLocation).then((result) => {
      expect(result.src.includes(testSvgFileLocation)).toBeTruthy();
      done();
    });
    service.imgLoader('asfhaskjdbakjc').catch((err: ErrorEvent) => {
      expect(err.type).toBe('imageLoadError');
      done();
    });
  });

  it('extractSvgDimension', () => {
    const { width, height } = service.extractSvgDimension(svgEl);
    expect(width).toBe(400);
    expect(height).toBe(400);
    const badDimensions = service.extractSvgDimension(
      document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    );
    expect(badDimensions.width).toBe(300);
  });

  it('produces a correct Readylink object', (done) => {
    service.downloadLinkCreator(svgEl, 'jpeg', 'prova').then((resultedLInk) => {
      const anchor = resultedLInk.anchor;
      expect(anchor).toBeTruthy();
      expect(anchor.download).toBe('prova');
      expect(anchor.href.includes('jpeg')).toBeTruthy();
      done();
    });
  });

  xit('handles correctly a loading img error', (done) => {
    service.downloadLinkCreator(badSvgEl, 'jpeg', 'bad').catch((nullImg) => {
      expect(nullImg).toBeNull();
    });
  });

  /**
   *
   *
   *
   *
   */
});

@Component({
  selector: 'test',
  templateUrl: '../../assets/coronavirus.component.svg',
})
export class TestHostComponent implements AfterViewInit {
  format: ImgFileType = 'png';
  svgElement: SVGElement;

  constructor(private dowloaderService: ImgDownloaderService) {}

  ngAfterViewInit() {
    this.svgElement = (document.getElementById(
      'mySvg'
    ) as unknown) as SVGElement;
  }

  download() {
    // this.dowloaderService.downloadImg(this.svgElement, this.format, 'prova');
  }
}

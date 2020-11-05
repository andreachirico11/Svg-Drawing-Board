import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatSvgComponent } from '../cat-svg/cat-svg.component';

import { ImgDownloaderService } from './img-downloader.service';
import { ImgFileType } from '../ultils/fileType';

describe('ImgDownloaderService', () => {
  let service: ImgDownloaderService,
    fixture: ComponentFixture<TestHostComponent>,
    testCanvas: HTMLCanvasElement,
    testSvgElement: SVGElement;
  const svgEl: SVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    ),
    sampleBlob = new Blob(['sample'], { type: 'text' }),
    testSvgFileLocation = '/assets/coronavirus.component.svg';
  /**
   *
   *
   *
   */
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CatSvgComponent, TestHostComponent],
        providers: [ImgDownloaderService],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.get(ImgDownloaderService);
          fixture = TestBed.createComponent(TestHostComponent);
          fixture.detectChanges();
          testSvgElement = fixture.debugElement.query(By.css('svg'))
            .nativeElement;
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

  it('expect linkCreator to create a correct anchor tag', () => {
    const link = service.linkElementCreator('provaprovaprova', 'prova');
    expect(link.href.split('/')).toContain('provaprovaprova');
    expect(link.download).toEqual('prova');
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

  it('create objUrlCreator to create a correct object url', () => {
    const completeUrl = document.location.href,
      actualUrl = completeUrl.substring(0, completeUrl.lastIndexOf('/')) + '/',
      blobUrl = service.objUrlCreator(sampleBlob);
    expect(blobUrl.includes(actualUrl)).toBeTruthy();
    expect(blobUrl.includes('blob')).toBeTruthy();
  });

  it('create a canvas element', () => {
    expect(testCanvas.width).toBe(50);
  });

  it('canvasToDataUrl converts succesfully', () => {
    expect(
      service.canvasToDataUrl(testCanvas, 'webp').includes('data')
    ).toBeTruthy();
  });

  it('imgLoader succesfully load real url and detects wrong ones', (done) => {
    service.imgLoader(testSvgFileLocation).then((result) => {
      expect(result.src.includes(testSvgFileLocation)).toBeTruthy();
      done();
    });
    service.imgLoader('asfhaskjdbakjc').catch((err: ErrorEvent) => {
      expect(err.type).toEqual('error');
      done();
    });
  });

  it('extractSvgDimension', () => {
    const { width, height } = service.extractSvgDimension(testSvgElement);
    expect(width).toBe(300);
    expect(height).toBe(300);
  });

  it('downloadImg launched by the component', () => {
    fixture.componentInstance.download();
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
    this.dowloaderService.downloadImg(this.svgElement, this.format, 'prova');
  }
}

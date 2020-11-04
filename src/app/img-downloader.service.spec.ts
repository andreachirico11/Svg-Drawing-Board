import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CatSvgComponent } from './cat-svg/cat-svg.component';

import { ImgDownloaderService } from './img-downloader.service';

describe('ImgDownloaderService', () => {
  let service: ImgDownloaderService,
    catComponent: ComponentFixture<CatSvgComponent>,
    catSvg;
  const svgEl: SVGElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    ),
    sampleBlob = new Blob(['sample'], { type: 'text' });
  /**
   *
   *
   *
   */
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CatSvgComponent],
        providers: [ImgDownloaderService],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.get(ImgDownloaderService);
          catComponent = TestBed.createComponent(CatSvgComponent);
          catSvg = catComponent.debugElement.query(By.css('svg')).nativeElement;
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

  it('expect link creator to create a correct anchor tag', () => {
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
        expect(res).toEqual(svgEl.outerHTML);
      });
    })
  );

  it('create an object url', () => {
    const completeUrl = document.location.href,
      actualUrl = completeUrl.substring(0, completeUrl.lastIndexOf('/')) + '/',
      blobUrl = service.objUrlCreator(sampleBlob);
    expect(blobUrl.includes(actualUrl)).toBeTruthy();
  });

  it(
    'resolves with a canvas element',
    waitForAsync(() => {
      service
        .canvasCreator('/assets/original-cat.svg', 500, 500)
        .then((canvas) => {
          document.getElementsByTagName('body')[0].appendChild(canvas);
          expect(document.getElementsByTagName('canvas')[0].width).toBe(500);
        })
        .catch(() => {
          console.error('testing error');
        });
    })
  );

  // it(
  //   'rejects a fake link canvas element',
  //   waitForAsync(() => {
  //     service
  //       .canvasCreator('afsdfafafs', 1, 2)
  //       .then()
  //       .catch((error: Event) => {
  //         expect(error.type).toBe('error');
  //       });
  //   })
  // );

  xit(
    'produces a correct anchor element',
    waitForAsync(() => {
      service.downloadImg(catSvg, 'png').then((anchor) => {
        expect(anchor).toBeTruthy();
      });
    })
  );

  /**
 * 
 * 
 * 
 * 




 */
});

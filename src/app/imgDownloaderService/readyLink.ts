export class ReadyLink {
  private _anchor: HTMLAnchorElement;
  constructor(private href: string, private fileName = 'defaultName') {
    this._anchor = document.createElement('a');
    this._anchor.download = fileName;
    this._anchor.href = href;
    this._anchor.style.display = 'none';
  }
  // constructor(private href: string, private fileName = 'defaultName') {
  //   const temp = document.createElement('a');
  //   temp.download = fileName;
  //   temp.href = href;
  //   temp.style.display = 'none';
  //   this._anchor = temp;
  // }
  public get anchor(): HTMLAnchorElement {
    return this._anchor;
  }
  public download(): void {
    document.body.appendChild(this._anchor);
    this._anchor.click();
    this.remove();
  }
  public remove(): void {
    this._anchor.remove();
  }
}

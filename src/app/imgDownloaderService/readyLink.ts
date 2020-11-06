export class ReadyLink {
  private _anchor: HTMLAnchorElement;
  constructor(private href: string, private fileName = 'defaultName') {
    this._anchor = document.createElement('a');
    this._anchor.download = fileName;
    this._anchor.href = href;
    this._anchor.style.display = 'none';
  }
  public get anchor(): HTMLAnchorElement {
    return this._anchor;
  }
  public download(): void {
    document.body.appendChild(this.anchor);
    this.anchor.click();
    this.remove();
  }
  public remove(): void {
    this.anchor.remove();
  }
}

export class PageRouteMapping {
  static readonly routes = [
    { path: '/gallery', label: 'Galerie' },
    { path: '/aboutme', label: 'Über mich' },
    { path: '/contact', label: 'Kontakt' },
    { path: '/impressum', label: 'Impressum' },
    { path: '/datenschutz', label: 'Datenschutz' }
  ];

  static getLabel(path: string): string {
    return this.routes.find(r => r.path === path)?.label ?? '';
  }

  static getPath(label: string): string {
    return this.routes.find(r => r.label === label)?.path ?? '';
  }
}

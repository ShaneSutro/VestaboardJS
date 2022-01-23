export class Formatter {
  name: string;
  constructor() {
    this.name = 'Formatter';
  }

  isValid(text: string): boolean {
    return /^(?:[A-Za-z\d!@#$()\-+&=;:'"%,./?°\s]|(?:\{\d{1,2}\}))*$/.test(text);
  }

  _standard(text: string): { text: string } {
    if (this.isValid(text)) {
      return { text };
    }
    return { text: '' };
  }
}

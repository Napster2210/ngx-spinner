import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});

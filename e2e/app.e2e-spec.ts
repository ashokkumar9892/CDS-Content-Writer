import { CdsContentEditorPage } from './app.po';

describe('cds-content-editor App', function() {
  let page: CdsContentEditorPage;

  beforeEach(() => {
    page = new CdsContentEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { browser, logging } from 'protractor'

// import { AppPage } from './app.po'

describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('LocalCast Weather')

  })

})


// describe('workspace-project App', () => {
//   let page: AppPage;
//   beforeEach(() => {
//     page = new AppPage();
//   });

  //   it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).equal('local-weather-app app is running!');
  // });

//   afterEach(async () => {
//     // Assert that there are no errors emitted from the
//     const logs = await browser.manage().logs().get(logging.Type.BROWSER);
//     expect(logs).not.contain(
//       jasmine.objectContaining({
//         level: logging.Level.SEVERE,
//       } as logging.Entry)
//     );
//   });
// });

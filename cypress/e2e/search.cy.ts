import { SEARCH_TEXT } from "../constants";


describe('Search text', () => {

  beforeEach(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.visit('/')
  })
  let apiResponse: any


  it('should enter search text', () => {

    cy.intercept('POST', `/api/search_data?search=${SEARCH_TEXT[0].text}`).as('search_api_call');

    // step 1 : Enter phone number
    cy.dataCy("search-input").click().type(SEARCH_TEXT[0].text);


    cy.waitForVerification('@search_api_call')
      .then((response) => {
        apiResponse = response
      });

  })
  it('match expected output of api , for keyword = "new"', () => {
    expect(apiResponse.data[0].id).to.eq(4);
    expect(apiResponse.data[0].title).to.equal("Confessions of an Economic Hitman");

    expect(apiResponse.data[1].id).to.eq(3);
    expect(apiResponse.data[1].title).to.equal("The Nurture Assumption");

    expect(apiResponse.data[2].id).to.eq(7);
    expect(apiResponse.data[2].title).to.equal("Sapiens");

    expect(apiResponse.data[3].id).to.eq(54);
    expect(apiResponse.data[3].title).to.equal("Fooled by Randomness");
  });

})
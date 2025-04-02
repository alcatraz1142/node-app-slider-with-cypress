describe("Testing Slider", function() {
    it("Navigate to next slide and check for UK", function (){
        cy.visit("http://localhost:3000");
        cy.get('.swiper-button-next').click();
        cy.wait(2000);
        cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
        cy.get('.swiper-button-prev').click();
        cy.wait(2000);
        cy.get('.swiper-slide-active').should('contain', 'Italy');

    });


    
});


describe("Swiper Gallery - Slide Descriptions", function() {
    it("Checks if each slide's title and description are correct", function() {
      // Krok 1: Odwiedź stronę z galerią
      cy.visit("http://localhost:3000");
  
      // Oczekiwane wartości tytułów i opisów
      const slides = [
        { title: "Rome", description: "Italy" },
        { title: "London", description: "United Kingdom" },
        { title: "Paris", description: "France" }
      ];
  
      // Krok 2: Dla każdego slajdu
      slides.forEach((slide, index) => {
        // Używamy `cy.get` do znalezienia aktywnego slajdu
        cy.get('.swiper-slide').eq(index).within(() => {
          // Sprawdzamy, czy tytuł i opis są widoczne
          cy.get('.card-description h1').should('contain', slide.title);
          cy.get('.card-description p').should('contain', slide.description);
        });
      });
    });
  });


  describe("Swiper Gallery Responsiveness", function () {

    // Funkcja do testowania na różnych rozdzielczościach
    const testResolution = (width, height, deviceName) => {
      it(`should display gallery correctly on ${deviceName}`, function () {
        // Krok 1: Ustawiamy rozdzielczość ekranu
        cy.viewport(width, height);
  
        // Odwiedzamy stronę z galerią
        cy.visit("http://localhost:3000");
  
        // Krok 2: Sprawdzamy, czy galeria jest widoczna i dostosowuje się do rozmiaru
        cy.get('.swiper').should('be.visible');
        
        // Sprawdzamy, czy przyciski nawigacyjne są dostępne i klikalne
        cy.get('.swiper-button-next').should('be.visible').click();
        cy.get('.swiper-button-prev').should('be.visible').click();
        
        // Upewniamy się, że nawigacja działa (np. przejście na następny slajd)
        cy.get('.swiper-slide-active').should('be.visible');
      });
    };
  
    // Testujemy na różnych urządzeniach
    testResolution(1920, 1080, "Desktop");    // Komputer stacjonarny
    testResolution(768, 1024, "Tablet");     // Tablet
    testResolution(375, 667, "Mobile");      // Telefon komórkowy
  
  });
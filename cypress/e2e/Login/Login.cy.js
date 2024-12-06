describe('SignCompo Component', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('http://localhost:3000/signin'); // Replace with the actual route for the SignCompo component
    });
  
    it('should render the login form correctly', () => {
      // Check if all elements are present
      cy.get('h2').should('contain', 'Welcome Back');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('contain', 'Login');
      cy.get('button').contains('Forgot password?').should('exist');
      cy.get('button').contains('Register').should('exist');
    });
  
    it('should show validation errors for empty fields', () => {
      // Attempt to submit the form with empty fields
      cy.get('button[type="submit"]').click();
      // Verify the error message
      cy.get('.toast').should('contain', 'Please fill in all fields');
    });
  
    it('should handle input changes correctly', () => {
      const email = 'test@example.com';
      const password = 'password123';
  
      // Fill in the email and password fields
      cy.get('input[name="email"]').type(email).should('have.value', email);
      cy.get('input[name="password"]').type(password).should('have.value', password);
    });
  
    it('should navigate to the registration page on "Register" button click', () => {
      // Click the register button
      cy.get('button').contains('Register').click();
      // Verify navigation to the registration page
      cy.url().should('include', '/register');
    });
  
    it('should navigate to the forgot password page on "Forgot password?" link click', () => {
      // Click the forgot password button
      cy.get('button').contains('Forgot password?').click();
      // Verify navigation to the forgot password page
      cy.url().should('include', '/forgot-password');
    });
  
    it('should log in successfully with valid credentials', () => {
      const email = 'test@example.com';
      const password = 'password123';
  
      // Mock the API response for successful login
      cy.intercept('POST', '/user/logincustomer', {
        statusCode: 200,
        body: {
          role: 'customer',
          email,
        },
      });
  
      // Fill in the form
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify the success message and navigation
      cy.get('.toast').should('contain', 'Successfully logged in!');
      cy.url().should('include', '/home');
    });
  
    it('should show an error message for invalid credentials', () => {
      const email = 'invalid@example.com';
      const password = 'wrongpassword';
  
      // Mock the API response for invalid credentials
      cy.intercept('POST', '/user/logincustomer', {
        statusCode: 401,
        body: { message: 'Invalid credentials' },
      });
  
      // Fill in the form
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Verify the error message
      cy.get('.toast').should('contain', 'Invalid credentials');
    });
  });
  
import fallbackImage from '../../src/assets/thumbnail_fallback.webp';
import { Card } from '../../src/components/Card';

describe('<Card />', () => {
    it('should render correctly', () => {
        cy.mount(
            <Card
                image={fallbackImage}
                title="title"
                subtitle="subtitle"
                summary="summary"
            />
        );
        cy.get('.card .title').should('have.text', 'title');
        cy.get('.card .subtitle').should('have.text', 'subtitle');
        cy.get('.card .summary').should('have.text', 'summary');
        cy.get('.card .thumbnail').should('have.attr', 'src', fallbackImage);
    });

    it('should render correctly without subtitle', () => {
        cy.mount(
            <Card image={fallbackImage} title="title" summary="summary" />
        );
        cy.get('.card .title').should('have.text', 'title');
        cy.get('.card .subtitle').should('not.exist');
        cy.get('.card .summary').should('have.text', 'summary');
        cy.get('.card .thumbnail').should('have.attr', 'src', fallbackImage);
    });
});

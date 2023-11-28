import { GetScheduleResponse } from '../../src/api/responses/ScheduleListResponse';

const withScheduleFixture = (
    callback: (schedule: GetScheduleResponse) => void
) => {
    cy.fixture('schedule.json').then((schedule: GetScheduleResponse) => {
        let scheduleWithModifiedAirstamps: GetScheduleResponse = schedule.map(
            (show) => {
                return {
                    ...show,
                    airstamp: '2099-01-01T20:00:00+00:00',
                    airtime: '20:00',
                };
            }
        );
        callback(scheduleWithModifiedAirstamps);
    });
};

describe('<Home />', () => {
    it('it renders', () => {
        withScheduleFixture((schedule: GetScheduleResponse): any => {
            cy.intercept('GET', '/schedule**', schedule).as('getSchedule');
            cy.visit('http://localhost:5173/');
            cy.contains('Harley Quinn').should('be.visible');
            cy.get('[data-cy=card]').should('have.length', schedule.length);
        });
    });

    it('it displays loader', () => {
        withScheduleFixture((schedule: GetScheduleResponse): any => {
            cy.intercept('GET', '/schedule**', (req) => {
                req.reply({
                    body: JSON.stringify(schedule),
                    delay: 1000,
                });
            }).as('getSchedule');
            cy.visit('http://localhost:5173/');
            cy.get('[data-cy=request-loader]').should('have.been.visible');
            cy.wait('@getSchedule');
        });
    });

    it('it displays slow request indicator', () => {
        withScheduleFixture((schedule: GetScheduleResponse): any => {
            cy.intercept('GET', '/schedule**', (req) => {
                req.reply({
                    body: JSON.stringify(schedule),
                    delay: 2000,
                });
            }).as('getDelayedSchedule');
            cy.visit('http://localhost:5173/');
            cy.get('[data-cy=request-loader__delayed]').should(
                'have.been.visible'
            );
            cy.wait('@getDelayedSchedule');
        });
    });
    it('it should navigate to details page when card is clicked', () => {
        withScheduleFixture((schedule: GetScheduleResponse): any => {
            cy.intercept('GET', '/schedule**', schedule).as('getSchedule');
            cy.intercept('GET', '/shows/**', schedule[0].show).as('getDetails');
            cy.visit('http://localhost:5173/');
            cy.get('[data-cy=card]').first().click();
            cy.url().should('include', `/show/${schedule[0].show.id}`);
        });
    });
});

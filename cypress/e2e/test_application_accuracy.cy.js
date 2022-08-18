describe('test with mock data if the data is correctly presented', () => {
    it('should return the right values', () => {
        cy.intercept(
            'GET', 
            'https://api.openweathermap.org/data/2.5/weather?q=ghent&units=metric&appid=e7a90afe281296f42d13ad88d019073d', 
            { fixture: 'get_details_city_name.json' }
        );

        cy.intercept(
            'GET', 
            'https://api.openweathermap.org/data/2.5/onecall?lat=51.05&lon=3.7167&exclude=current%2Cminutely%2Calerts&units=metric&appid=e7a90afe281296f42d13ad88d019073d', 
            { fixture: 'get_hourly_daily_details.json' }
        );

        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=location]', { timeout: 10000 }).contains('Ghent, BE');
        cy.get('[data-cy=date_time]').contains('Tuesday, 16 Aug 2022 | Local time: 08:58 PM');
        
        cy.get('[data-cy=weather_details]').contains('Clouds');
        cy.get('[data-cy=weather_current_temp]').contains('21°');
        cy.get('[data-cy=weather_realfeel]').contains('21°');
        cy.get('[data-cy=weather_humidity]').contains('68%');
        cy.get('[data-cy=weather_wind_speed]').contains('7 km/h');
        cy.get('[data-cy=weather_visibility]').contains('10 km');
        cy.get('[data-cy=weather_sunrise]').contains('06:33 AM');
        cy.get('[data-cy=weather_sunset]').contains('09:05 PM');
        cy.get('[data-cy=weather_temp_high]').contains('24°');
        cy.get('[data-cy=weather_temp_low]').contains('20°');

        cy.get('[data-cy=forecast_title]').eq(0).contains('hourly forecast');
        cy.get('[data-cy=forecast_title]').eq(1).contains('daily forecast');

        cy.get('[data-cy=forecast_time_title]').eq(0).contains('09:00 PM');
        cy.get('[data-cy=forecast_time_title]').eq(1).contains('10:00 PM');
        cy.get('[data-cy=forecast_time_title]').eq(2).contains('11:00 PM');
        cy.get('[data-cy=forecast_time_title]').eq(3).contains('12:00 AM');
        cy.get('[data-cy=forecast_time_title]').eq(4).contains('01:00 AM');

        cy.get('[data-cy=forecast_temp]').eq(0).contains('21°');
        cy.get('[data-cy=forecast_temp]').eq(1).contains('21°');
        cy.get('[data-cy=forecast_temp]').eq(2).contains('20°');
        cy.get('[data-cy=forecast_temp]').eq(3).contains('20°');
        cy.get('[data-cy=forecast_temp]').eq(4).contains('19°');

        cy.get('[data-cy=forecast_time_title]').eq(5).contains('Wed');
        cy.get('[data-cy=forecast_time_title]').eq(6).contains('Thu');
        cy.get('[data-cy=forecast_time_title]').eq(7).contains('Fri');
        cy.get('[data-cy=forecast_time_title]').eq(8).contains('Sat');
        cy.get('[data-cy=forecast_time_title]').eq(9).contains('Sun');

        cy.get('[data-cy=forecast_temp]').eq(5).contains('23°');
        cy.get('[data-cy=forecast_temp]').eq(6).contains('26°');
        cy.get('[data-cy=forecast_temp]').eq(7).contains('26°');
        cy.get('[data-cy=forecast_temp]').eq(8).contains('24°');
        cy.get('[data-cy=forecast_temp]').eq(9).contains('22°');
    });
});
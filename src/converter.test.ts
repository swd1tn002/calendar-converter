import { expect, describe, it } from 'vitest';
import convertToICalendar from './converter';

describe('convertToICalendar', () => {

    it('should be exported as the default export', () => {
        expect(typeof convertToICalendar).toBe('function');
    });

    it('should take a calendar object and return a string', () => {
        const output = convertToICalendar(testCalendar);

        expect(typeof output).toBe('string');
    });

    it('should include VCALENDAR and VEVENT entries', () => {
        const output = convertToICalendar(testCalendar);

        expect(output).toContain('BEGIN:VCALENDAR');
        expect(output).toContain('END:VCALENDAR');
        expect(output).toContain('BEGIN:VEVENT');
        expect(output).toContain('END:VEVENT');
    });

    it('should handle empty events array', () => {
        // Copy the calendar, but set events to an empty array
        const noEvents = { ...testCalendar, events: [] };
        const output = convertToICalendar(noEvents);

        // Calendar structure should still be present
        expect(output).toContain('BEGIN:VCALENDAR');
        expect(output).toContain('END:VCALENDAR');

        // But there should be no VEVENT entries
        expect(output).not.toContain('BEGIN:VEVENT');
    });

    it('should contain correct number of VEVENT entries', () => {
        const output = convertToICalendar(testCalendar);

        // Count occurrences of BEGIN:VEVENT
        const eventCount = (output.match(/BEGIN:VEVENT/g) || []).length;

        // Should match the number of events in the test calendar
        expect(eventCount).toBe(testCalendar.events.length);
    });

    it('should contain event details', () => {
        const output = convertToICalendar(testCalendar);

        // Check that each event's details are included
        testCalendar.events.forEach(event => {
            expect(output).toContain(event.subject);

            // Check that the start and end dates are included (just the date part)
            expect(output).toContain(event.start_date.replaceAll("-", "").substring(0, 8));
            expect(output).toContain(event.end_date.replaceAll("-", "").substring(0, 8));

            event.location.forEach(loc => {
                // check that the location name is included for all events
                expect(output).toContain(loc.name);
            });
        });
    });
});

const testCalendar = {
    "name": "Infinity IT Project",
    "code": "infinity-it",
    "office": "Scranton",
    "start_date": "2027-09-01",
    "end_date": "2027-12-15",
    "events": [
        {
            "event_id": 101,
            "start_date": "2027-09-02 09:00",
            "end_date": "2027-09-02 10:30",
            "subject": "Sprint Planning",
            "location": [
                {
                    "class": "ConfRoom-A",
                    "name": "Conference Room",
                    "parent": "Scranton"
                }
            ]
        },
        {
            "event_id": 102,
            "start_date": "2027-09-16 15:00",
            "end_date": "2027-09-16 16:00",
            "subject": "Sprint Review",
            "location": [
                {
                    "class": "BreakRoom",
                    "name": "Break Room",
                    "parent": "Scranton"
                }
            ]
        }
    ]
};

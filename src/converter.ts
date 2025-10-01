import ical, { type ICalEventData } from 'ical-generator';
import type { Calendar, Event } from './types.js';
import { parseHelsinkiTime } from '@ohjelmistokehitys/time-tools';

/**
 * Takes a JSON calendar and converts it to iCalendar format.
 *
 * @param jsonCalendar - The JSON calendar to convert.
 * @returns The events in the given calendar as an iCalendar string.
 */
export default function convertToICalendar(jsonCalendar: Calendar): string {
    const cal = ical();

    // convert each JSON event to iCalendar format
    jsonCalendar.events.forEach(jsonEvent => {
        cal.createEvent(convertEvent(jsonEvent));
    });

    return cal.toString();
}

/**
 * Converts a single event from JSON format to the format,
 * that ical-generator understands.
 */
function convertEvent(data: Event): ICalEventData {
    return {
        id: data.event_id,
        description: data.subject,
        start: parseHelsinkiTime(data.start_date),
        end: parseHelsinkiTime(data.end_date),
        summary: data.subject,
        location: `${data.location[0].name}, ${data.location[0].parent}`
    };
}

type Calendar = {
    name: string;
    code: string;
    office: string;
    start_date: string;
    end_date: string;
    events: Event[];
};

type Event = {
    event_id: number;
    start_date: string;
    end_date: string;
    subject: string;
    location: Location[];
};

type Location = {
    class: string;
    name: string;
    parent: string;
};

export type { Location, Event, Calendar };

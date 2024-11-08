// src/components/EventList.js
import React from 'react';

function EventList({ events }) {
    return (
        <div>
            <h2>Event List</h2>
            {events.length === 0 ? (
                <p>No events added yet</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>
                                Date: {event.date}, Time: {event.time}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default EventList;

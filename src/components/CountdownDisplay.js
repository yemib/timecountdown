// src/components/CountdownDisplay.js
import React, { useEffect, useState } from 'react';
import moment from 'moment';

function CountdownDisplay({ events }) {
    const [timeRemaining, setTimeRemaining] = useState([]);

    useEffect(() => {
        // Function to update countdowns
        const updateCountdowns = () => {
            const updatedTimes = events.map((event) => {
                const eventTime = moment(`${event.date} ${event.time}`);
                const now = moment();
                const duration = moment.duration(eventTime.diff(now));

                // Calculate days, hours, minutes, and seconds remaining
                const days = Math.floor(duration.asDays());
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();

                return {
                    id: event.id,
                    title: event.title,
                    days,
                    hours,
                    minutes,
                    seconds,
                };
            });
            setTimeRemaining(updatedTimes);
        };

        // Initial countdown calculation and setting up an interval
        updateCountdowns();
        const intervalId = setInterval(updateCountdowns, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [events]);

    return (
        <div>
            <h2>Event Countdown</h2>
            {timeRemaining.length === 0 ? (
                <p>No upcoming events</p>
            ) : (
                <ul>
                    {timeRemaining.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p>
                                {event.days}d {event.hours}h {event.minutes}m {event.seconds}s remaining
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CountdownDisplay;

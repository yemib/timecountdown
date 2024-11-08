// src/components/ReminderSettings.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';

function ReminderSettings({ events }) {
    const [reminderTimes, setReminderTimes] = useState({});

    useEffect(() => {
        const intervalId = setInterval(checkReminders, 1000);

        return () => clearInterval(intervalId);
    }, [events, reminderTimes]);

    const handleReminderChange = (eventId, time) => {
        setReminderTimes((prev) => ({
            ...prev,
            [eventId]: time,
        }));
    };

    const checkReminders = () => {
        events.forEach((event) => {
            const reminderTime = reminderTimes[event.id];
            if (reminderTime) {
                const eventTime = moment(`${event.date} ${event.time}`);
                const now = moment();
                const timeDiff = eventTime.diff(now, 'minutes');

                if (timeDiff <= reminderTime && timeDiff > 0) {
                    // Trigger notification
                    if (Notification.permission === 'granted') {
                        new Notification(`Reminder for "${event.title}"`);
                    }
                    // Remove the reminder so it doesn't fire again
                    setReminderTimes((prev) => ({
                        ...prev,
                        [event.id]: null,
                    }));
                }
            }
        });
    };

    return (
        <div>
            <h2>Reminder Settings</h2>
            {events.length === 0 ? (
                <p>No events to set reminders for</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <label>Reminder Time (minutes before):</label>
                            <input
                                type="number"
                                min="1"
                                value={reminderTimes[event.id] || ''}
                                onChange={(e) =>
                                    handleReminderChange(event.id, parseInt(e.target.value, 10))
                                }
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ReminderSettings;

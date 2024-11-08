// src/App.js
import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import CountdownDisplay from './components/CountdownDisplay';
import ReminderSettings from './components/ReminderSettings';

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Load events from local storage
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }

        // Request notification permission on load
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        // Save events to local storage
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    return (
        <div className="App">
            <h1>Event Countdown and Reminder App</h1>
            <EventForm addEvent={addEvent} />
            <EventList events={events} />
            <CountdownDisplay events={events} />
            <ReminderSettings events={events} />
        </div>
    );
}

export default App;

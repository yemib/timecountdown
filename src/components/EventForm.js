// src/components/EventForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function EventForm({ addEvent }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && date && time) {
            // Generate a new event with a unique ID
            const newEvent = {
                id: uuidv4(),
                title,
                description,
                date,
                time,
            };

            addEvent(newEvent); // Pass the new event to the parent component
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
        } else {
            alert('Please fill out all required fields');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Event</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Time:</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Event</button>
        </form>
    );
}

export default EventForm;

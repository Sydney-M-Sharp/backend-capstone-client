import React, { useState } from 'react';

function CreateEventForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [location, setLocation] = useState(initialData.location || '');
  const [date, setDate] = useState(initialData.date || '');
  const [time, setTime] = useState(initialData.time || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [link, setLink] = useState(initialData.link || '');
  const [trip, setTrip] = useState(initialData.trip || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title,
      location,
      date,
      time,
      description,
      link,
      trip,
    };
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Link:</label>
        <input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
      </div>
      <div>
        <label>Trip:</label>
        <input type="text" value={trip} onChange={(e) => setTrip(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateEventForm;
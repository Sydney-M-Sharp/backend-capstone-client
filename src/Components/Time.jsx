export const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = ((hours + 11) % 12 + 1); // Convert to 12-hour format
    return `${hours}:${minute} ${suffix}`;
  };
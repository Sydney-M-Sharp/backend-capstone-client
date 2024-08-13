export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1); // Adjust the date forward by one day
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

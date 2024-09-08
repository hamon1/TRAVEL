export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('.').filter(Boolean);

    const shortYear = year.slice(-2);

    console.log('formatDate: ', year, month, day);

    const formattedDate = `${shortYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
};

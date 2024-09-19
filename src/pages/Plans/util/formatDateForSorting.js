// import firestore from '@react-native-firebase/firestore';
export const formatDateForSorting = (d_date, d_time) => {
    const [period, time] = d_time.split(' ');
    let [hour, minute] = time.split(':');

    hour = parseInt(hour, 10);

    if (period === '오후') {
        hour += 12;
    }

    const farmattedDate = `${d_date}-${hour}-${minute}`;
    console.log('formatDateForSorting -> ', farmattedDate);

    return farmattedDate;
}
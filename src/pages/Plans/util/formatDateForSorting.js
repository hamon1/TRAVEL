/**
 * firebase 오름차순 정렬을 위한 데이터를 생성함. 
 * 기호를 생략하고 '-'만 들어감. 이외에는 모두 숫자
 * 년도-달-시간-분 순서로 배치됨.
 * @param {*} d_date 
 * @param {*} d_time 
 * @returns 
 */

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
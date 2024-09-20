/**
 * 2024.9.10. 형태의 데이터를 24-09-10 형태로 바꾸는 함수.
 * @param {*} dateString 2024.9.10.
 * @returns 24-09-10
 */

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('.').filter(Boolean);

    const shortYear = year.slice(-2);

    console.log('formatDate: ', year, month, day);

    const formattedDate = `${shortYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
};

import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import moment from 'moment';

LocaleConfig.locales.fr = {
    monthNames: [
        '01월',
        '02월',
        '03월',
        '04월',
        '05월',
        '06월',
        '07월',
        '08월',
        '09월',
        '10월',
        '11월',
        '12월',
    ],
    monthNamesShort: [
        '01월',
        '02월',
        '03월',
        '04월',
        '05월',
        '06월',
        '07월',
        '08월',
        '09월',
        '10월',
        '11월',
        '12월',
    ],
    dayNames: [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
        '일요일',
    ],
    dayNamesShort: [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토',
    ],
};

LocaleConfig.defaultLocale = 'fr';

const Calendars = ({handleDateChange}) => {
    const date = moment().format('L');
    const [year, month, day] = date.split('.').filter(Boolean);

    const calender_base_date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return (
        <View style={styles.bg}>
            <Calendar 
            style={{
                borderRadius: 15,
                width: 300,
                height: 350,
                shadowColor: '#4d4d4d',
                shadowOffset: {width: 1, height: 2},
                shadowOpacity: 0.1,
                // borderColor: '#fb8c00',
                // borderWidth: 2,
            }}
            theme={{
                calendarBackground: '#ffffff',
                // todayTextColor: '#00adf5'
                todayTextColor: '#fb8c00',
                selectedDayBackgroundColor: '#fb8c00',
                arrowColor: '#fb8c00',
            }}
            current={calender_base_date}
            onDayPress={(day) => 
                // console.log('selected day', day)
                handleDateChange(day.dateString)
            }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Calendars;
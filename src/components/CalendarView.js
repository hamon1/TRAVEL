import React, { useContext } from "react";
import {Calendar} from 'react-native-calendars';
import { StyleSheet } from "react-native";
import { format } from "date-fns";

function CalendarView() {
    const markedDates = {
        '2024-07-21': {
            selected: true,
        },
    };
    
    return (
        <Calendar 
            style={styles.calendar} 
            markedDates={markedDates} 
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
            }}
        />
    );
}



const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default CalendarView;
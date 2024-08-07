import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from "react-native-geolocation-service";

// import {useNavigation} from '@react-navigation/native';

const ViewMap = ({modalOff, passDataToDetails, locationInput}) => {
    // const [data, setData] = useState([]);
    // const [dataDetail, setDataDetail] = useState([]);
    // const [location, setLocation] = useState([]);

    // const handlePress = (newData) => {
    //     const updatedData = [...data, newData]; // Spread existing data and add newData
    //     setData(updatedData);
    //     onSaveData(updatedData);  // Pass updated data to parent component
    //   };

    // useEffect(() => {
    //     console.log('data: ', data);
    // }, [data]);

    console.log('location input: ', locationInput);

    return (
        <View style={style.box}>
            
            <MapView
              style={style.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                // latitude: 37.78825,
                // longitude: -122.4324,
                latitude: locationInput.latitude,
                longitude: locationInput.longitude,
                // latitudeDelta: 0.0922,
                latitudeDelta: 0.05,
                // longitudeDelta: 0.0421,
                longitudeDelta: 0.05,
              }}
              />
            <GooglePlacesAutocomplete
              minLength={2}
              placeholder="장소를 검색해보세요!"
              query={{
                  key: 'AIzaSyDRdIybBpN0aO6gJal9skDd0VG6KMrgqJk',
                  language: "ko",
                  components: "country:kr",
              }}
              keyboardShouldPersistTaps={"handled"}
              fetchDetails={true}
              onPress={(data, details) => {
                console.log(data, details);
                // setData(prevData => [...prevData, data]);
                // handlePress(data);
                modalOff();
                passDataToDetails(data, details);
              }}
              onFail={(error) => console.log(error)}
              onNotFound={() => console.log("no results")}
              keepResultsAfterBlur={true}
              enablePoweredByContainer={false}
              styles={autocompleteStyles}
              />

        </View>
    )   
}

const autocompleteStyles = {
    container: {
      width: '100%',
      top: 90,
      position: 'absolute',
    },
    textInputContainer: {
      marginLeft: 10,
      marginRight: 10,
    },
    textInput: {
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    listView: {
      margin: 10,
      borderRadius: 12,
    },
  };

const style = StyleSheet.create({
    ee: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        top: 150,
        left: 20,
        position: 'absolute'
    },
    box: {
      flex: 1,
      backgroundColor:'red',
      position: 'relative',
    },
    search: {      
        position: 'absolute',
        container: {
            // height: '100%',
            width: '100%',
            top: 90,
            position: 'absolute',
            // // backgroundColor: 'yellow',
        },
        textInputContainer: {
            // backgroundColor: 'grey',
            marginLeft: 10,
            marginRight: 10,
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            margin: 10,
            borderRadius: 12,
          },
    },
    map: {
        // flex: 1,
        // top: 0,
        height: '100%',
    }
  });

export default ViewMap;
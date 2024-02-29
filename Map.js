import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import {useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
const goBack=()=>{
  const navigation=useNavigation();
  navigation.goBack
}

export default class HeatMap extends Component {

  static navigationOptions = {
    title: 'Flood-Prone Areas in Pakistan',
  };

  state = {
    initialPosition: {
      latitude: 30.3753, // Central latitude for Pakistan
      longitude: 69.3451, // Central longitude for Pakistan
      latitudeDelta: 10,
      longitudeDelta: 8
    }
  }

  points = [
     // flood-prone areas in Pakistan with their latitude and longitude
    { latitude: 34.8065, longitude: 72.3548, weight: 1 },//Sawat
    { latitude: 35.2611, longitude: 73.2765, weight: 1 },//Kohistan
    { latitude: 32.9431, longitude: 69.9550, weight: 1 },//North Waziristan
    { latitude: 35.7699, longitude: 71.7741, weight: 1 },//Chitral
    { latitude: 31.8626, longitude: 70.9019, weight: 1 },//D.I.Khan
    { latitude: 34.3313, longitude: 73.1980, weight: 1 },//Mansehra
    { latitude: 34.1682, longitude: 71.7504, weight: 1 },//Charsadda
    { latitude: 34.0105, longitude: 71.9876, weight: 1 },//Nowshera
    { latitude: 34.0151, longitude: 71.5249, weight: 1 },//Peshawar
    { latitude: 34.1986, longitude: 72.0404, weight: 1 },//Mardan
    { latitude: 34.5030, longitude: 71.9046, weight: 1 },//Malakand
    { latitude: 34.3943, longitude: 72.6151, weight: 1 },//Buneer
    { latitude: 32.9910, longitude: 70.6455, weight: 1 },//Bannu
    { latitude: 27.5256, longitude: 68.7551, weight: 1 },//Khairpur
    { latitude: 28.5855, longitude: 65.4163, weight: 1 },//Kharan
    { latitude: 27.7179, longitude: 64.8052, weight: 1 },//Washuk
    { latitude: 26.9706, longitude: 64.0887, weight: 1 },//Panjgur
    { latitude: 27.7244, longitude: 68.8228, weight: 1 },//Sukkur
    { latitude: 27.9570, longitude: 68.6380, weight: 1 },//Shikarpur
    { latitude: 30.1798, longitude: 66.9750, weight: 1 },//Quetta
    { latitude: 29.3058, longitude: 64.6945, weight: 1 },//Chagai
    { latitude: 30.5897, longitude: 67.0107, weight: 1 },//Pishin 
    { latitude: 25.5, longitude: 64, weight: 1 },//Makran
    { latitude: 26.0081, longitude: 63.0383, weight: 1 },//Turbat
    { latitude: 34.3551, longitude: 73.4769, weight: 1 },//Muzaffarabad
     
  ];

  render() {
    return (
      <View style={styles.container1}>
         {/* <TouchableOpacity
        style={{ top: 40, left: 20, position: "absolute" }}
        activeOpacity={0.8}
        onPress={()=>goBack()}
      >
        <Icon name="arrow-back-ios" size={35} color={"black"} />
      </TouchableOpacity> */}

      <View style={styles.container}>
        

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
          <Heatmap
            points={this.points}
            radius={40}
            opacity={1}
            gradient={{
              colors: ["black", "purple", "red", "orange", "white"],
              startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
                [0.1, 0.25, 0.5, 0.75, 1],
              colorMapSize: 2000
            }}
          />
        </MapView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

container1:{
flex:1
},

  container: {
    top:80,
    width:"100%",
    height:"90%"
    // ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
import React from 'react'
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Text, Appbar, Colors } from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import languageJSON from '../common/language';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import RNGooglePlaces from 'react-native-google-places';
const { width, height } = Dimensions.get('window');

const LATITUDE = 9.061460;
const LONGITUDE = 7.500640;
const LATITUDE_DELTA = 0.09922;
const LONGITUDE_DELTA = 0.09421;


class MapScreen extends React.Component {

  
  
  state = {
    latitude: LATITUDE,
    longitude: LONGITUDE,

    error: null,
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      initialQuery: 'vestar', 
      locationRestriction: {
          latitudeSW: 6.3670553, 
          longitudeSW: 2.7062895, 
          latitudeNE: 6.6967964, 
          longitudeNE: 4.351055
      },
      country: 'NG',
      type: 'establishment'
  }, ['placeID', 'location', 'name', 'address', 'types', 'openingHours', 'plusCode', 'rating', 'userRatingsTotal', 'viewport']
)
.then((place) => {
  console.log(place);
})
.catch(error => console.log(error.message));// error is a Javascript Error object
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.setState({
        latitude: position.coords.latitude,

        longitude: position.coords.longitude,

        error: null, 
      });

    }, error => this.setState({ error: error.message}))
  }


  render() {
    
    const {navigation} = this.props;
    return (
      
      <View style={styles.mainViewStyle}>
        <Appbar.Header>
          <Appbar.Action icon="menu"/>
          <Appbar.Content title="Map" style={{alignItems: 'center', marginRight: 40, justifyContent: 'center'}}/>
          <Appbar.Action icon="dots-vertical" />
       </Appbar.Header>

       <View style={styles.myViewStyle}>
         <View style={styles.coverViewStyle}>
           <View style={{height: 12, width: 12, borderRadius: 15/2, backgroundColor: Colors.red300,}}/>
           <View style={{height: height/25, width: 1, backgroundColor: Colors.red300,}}/>
           <View style={{height: 14, width: 14, backgroundColor: 'white', borderRadius: 15/2,}}/>
         </View>

         <View style={styles.iconsViewStyle}>
           <TouchableOpacity onPress={() => this.openSearchModal()} style={styles.contentStyle}>
             <View style={styles.textIconStyle}>
               <Text numberOfLines={1} style={styles.textStyle}>
                 {languageJSON.map_screen_where_input_text}
               </Text>

               <MaterialIcons name="gps-fixed" size={24} color="white" containerStyle={{flex:1}}/>
             </View>
           </TouchableOpacity>

           <TouchableOpacity style={styles.contentStyle} style={styles.searchClickStyle}>
             <View style={styles.textIconStyle}>
               <Text numberOfLines={1} style={styles.textStyle}>
                 {languageJSON.map_screen_drop_input_text}
               </Text>

               <MaterialIcons name="gps-fixed" size={24} color="white" containerStyle={{flex:1}}/>
             </View>
           </TouchableOpacity>
         </View>
       </View>
        <View style={styles.mapcontainer}>
          <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          loadingEnabled={true}
          showsMyLocationButton={true}
          style={{ ...StyleSheet.absoluteFillObject }}
          region={this.getMapRegion()}
          onMapReady={() => this.setState({ marginBottom: 1,})}>

    
          </MapView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },

  mapcontainer: {
    flex: 6,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverViewStyle: {
    flex: 1.5,
    alignItems: 'center',
  },

  textStyle: {
    flex: 9,
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },

  textIconStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentStyle: {
    justifyContent: 'center',
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },

  iconsViewStyle: {
    flex: 9.5,
    justifyContent: 'space-between',
  },

  myViewStyle: {
    flex: 1.5,
    flexDirection: 'row',
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingEnd: 20,
  },

  searchClickStyle: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default function(props: object) {
  const navigation = useNavigation();

  return <MapScreen {...props} navigation={navigation}/>
}


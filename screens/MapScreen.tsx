import React from 'react'
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Text, Appbar, Colors } from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';

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
         </View>

         <View>
           <TouchableOpacity>
             <View>
               <Text numberOfLines={1}>
                 
               </Text>
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

  myViewStyle: {
    flex: 1.5,
    flexDirection: 'row',
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingEnd: 20,
  }
})

export default MapScreen;

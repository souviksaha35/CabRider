import React, { useEffect, useState } from 'react'
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from  'react-native-google-places-autocomplete';
import {useRoute} from '@react-navigation/native';
function SearchScreen() {

  const route = useRoute();

  const [from, setFrom] = useState('');

  const [whereText, setWhereText] = useState('');

  const [dropText, setDropText] = useState('');

  useEffect(() => {
    const From = route.params.from;
    setFrom(From);

    const WhereText = route.params.whereText;
    setWhereText(WhereText);

    const DropText = route.params.dropText;
    setDropText(DropText);
  }, []);

  const goMap = (data, details, from:string) => {
    if (from == "where") {
      let searchObj = {
        searchDelta: data,
        searchDetails: details,
        searchFrom: from,
        whereText: details.formatted_address,
        dropText: dropText,
      }

      console.log(searchObj);
    }
  }
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        goMap(data, details, from)
      }}
      query={{
        key: 'AIzaSyB-E-_WDuz6KlGeGzVNVGBkyqp6_5zS-1I',
        language: 'en',
        types: '(geocode)'
      }}

      renderDescription={(row) => row.description || row.formatted_address || row.name}
      

      fetchDetails


      debounce={200}

      textInputProps={{ clearButtonMode: 'while-editing'}}


      styles={{
        textInput: styles.textInput,
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20, 
    marginBottom: 20,
  },

  container: {
    padding: 20,
    height: '100%',
    marginTop: 20,
    backgroundColor: 'white',
  }
});

export default SearchScreen;
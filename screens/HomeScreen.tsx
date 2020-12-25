import React from 'react'
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import * as firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';


function HomeScreen() {
  const navigation = useNavigation();

  async function signout() {
    const signOut = firebase.auth().signOut();
    console.log(signOut);
    navigation.navigate('AuthLoading');
  }
  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <Button
      mode="contained"
      onPress={signout}
      style={{height: 38, marginTop: 20, alignSelf: 'center',}}>
        SignOut
      </Button>
    </View>
  )
}

export default HomeScreen;
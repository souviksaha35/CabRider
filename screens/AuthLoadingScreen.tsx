import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import * as firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';
function AuthLoadingScreen() {

  const navigation = useNavigation();

  const __bootstrapAsync = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user',user);
      if (!user) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Map');
      }
    });
  }

  useEffect(() => {
    __bootstrapAsync();
  }, []);

  return (
    <View style={styles.IndicatorStyle}>
      <ActivityIndicator animating={true} size={"large"} color={Colors.red800} />
      <Text style={{color: Colors.red800, marginTop: 5, fontSize: 20, fontWeight: 'bold'}}>
        Loading...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  IndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white',
    alignItems: 'center',
  }
});

export default AuthLoadingScreen;
import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, TextInput,Colors, Button, Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';


function ForgotPasswordScreen() {
  
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Forgot-Password" subtitle="CabDriver"/>
      </Appbar.Header>
      <KeyboardAvoidingView behavior={Platform.OS=='ios'?"height":"height"} style={styles.form}>
        <View style={styles.containerStyle}>
        
      <TextInput
      mode="outlined"
      label="Email"
      blurOnSubmit={true}
      keyboardType={'email-address'}
      style={{borderColor: Colors.red800}}
      />

      <Button
      mode="contained"
      style={{height: 38, marginTop: 20, alignSelf: 'center',}}>
        Forgot Password
      </Button>

        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  form: {
    flex: 1,
  },

  containerStyle: {
    flexDirection: 'column',
    margin: 20,
    marginRight: 50,
    marginLeft: 50,
  },

  TextInputStyle: {
    paddingVertical: 20,
  }
})

export default ForgotPasswordScreen;

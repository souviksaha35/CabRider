import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import {Text, TextInput,Colors, Button, Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';


function LoginScreen() {

  const navigation = useNavigation();


  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [inputdisable, setInputDisable] = useState(false);
  const [buttondisable, setButtonDisable] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  async function clickLogin() {
    setButtonDisable(true);
    setButtonLoading(true);
    setInputDisable(true);

    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      console.log(res);
      alert('Login Successful');
      navigation.navigate('Home');
    }).catch((err) => {
      console.log(err);
      alert(err.message);
      setButtonDisable(false);
      setButtonLoading(false);
      setInputDisable(false);
    })
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Login" subtitle="CabDriver"/>
      </Appbar.Header>
      <KeyboardAvoidingView behavior={Platform.OS=='ios'?"height":"height"} style={styles.form}>
        <View style={styles.containerStyle}>
        
      <TextInput
      value={email}
      error={email ? false : true}
      disabled={inputdisable}
      onChangeText={(text) => setEmail(text)}
      mode="outlined"
      label="Email"
      keyboardType={'email-address'}
      style={{borderColor: Colors.red800}}
      />

      <TextInput
      value={password}
      error={password ? false : true}
      disabled={inputdisable}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={true}
      mode="outlined"
      label="Password"
      keyboardAppearance={'dark'}
      style={{borderColor: Colors.red800}}
      />

      <Button
      mode="contained"
      onPress={clickLogin}
      disabled={buttondisable}
      loading={buttonLoading}
      style={{height: 38, marginTop: 20, alignSelf: 'center',}}>
        Login
      </Button>

      <Button
      mode="contained"
      onPress={() => navigation.navigate('Signup')}
      style={{marginTop: 20,}}
      >
        Signup
      </Button>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 16, fontWeight: 'bold'}}>
          Don't Login? Forgot password
        </Text>
      </TouchableWithoutFeedback>
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

export default LoginScreen
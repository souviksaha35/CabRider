import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, TextInput,Colors, Button, Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';
function SignUpScreen() {
  const navigation = useNavigation();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [inputdisable, setInputDisable] = useState(false);
  const [buttondisable, setButtonDisable] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  async function clickRegister() {
    setButtonDisable(true);
    setButtonLoading(true);
    setInputDisable(true);

    const regData = {
      firstName:fname,
      lastName:lname,
      mobile:mobile,
      email: email,
      usertype:'rider', 
      createdAt: new Date().toISOString()
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      console.log(newUser);

      if(newUser) {
       const user = firebase.auth().currentUser;

       user?.updateProfile({
         displayName: regData.firstName +  ' ' + regData.lastName,
       }).then(() => {
         firebase.database().ref('users/').child(user.uid).set(regData).then(() => {
           firebase.auth().signOut();
           navigation.goBack();
           alert('Account creation successful');
         })
       })
      }
    }).catch((err) => {
      const errorMessage = err.message;
      console.log(errorMessage);
    })
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Signup" subtitle="CabDriver"/>
      </Appbar.Header>
      <KeyboardAvoidingView behavior={Platform.OS=='ios'?"height":"height"} style={styles.form}>
        <View style={styles.containerStyle}>
        <TextInput
        value={fname}
        returnKeyType={'next'}
        editable={true}
        error={fname ? false : true}
        disabled={inputdisable}
        onChangeText={(text) => setFname(text)}
        mode="outlined"
        label="First Name"
        style={{borderColor: Colors.red800}}
        />
        <TextInput
        value={lname}
        error={lname ? false : true}
        disabled={inputdisable}
        onChangeText={(text) => setLname(text)}
      mode="outlined"
      label="Last Name"
      style={{borderColor: Colors.red800}}
      />
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
      mode="outlined"
      style={styles.TextInputStyle}
      value={mobile}
      error={mobile ? false : true}
      disabled={inputdisable}
      autoCompleteType={'tel'}
      keyboardType={'number-pad'}
      onChangeText={(text) => setMobile(text)}
      label="Mobile No."
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
      onPress={clickRegister}
      disabled={buttondisable}
      loading={buttonLoading}
      style={{height: 38, marginTop: 20, alignSelf: 'center',}}>
        SignUp
      </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
};

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

export default SignUpScreen;
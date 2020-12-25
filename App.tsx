import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as firebase from 'firebase';
import { Provider as PaperProvider } from 'react-native-paper';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw4s-ZbfnYZredrrYa0YMTFXA-0K3cpfk",
  authDomain: "cabs-de96a.firebaseapp.com",
  databaseURL: "https://cabs-de96a-default-rtdb.firebaseio.com",
  projectId: "cabs-de96a",
  storageBucket: "cabs-de96a.appspot.com",
  messagingSenderId: "221653803863",
  appId: "1:221653803863:web:6a435841879711e20e5412",
  measurementId: "G-6P3TQ4YWGQ"
};
export default function App() {

  useEffect(() => {
    const initializeApp = firebase.initializeApp(firebaseConfig);

    console.log(initializeApp);
  }, []);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as Location from 'expo-location';
import * as SecureStore from "expo-secure-store";
import TabNavigation from './App/Navigations/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserLocationContex } from './App/Context/UserLocationContext';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log('bhel',currentLocation.coords);
        setLocation(currentLocation.coords);
        
      } catch (error) {
        setErrorMsg('Error fetching location');
      }
    })();
    console.log(location)
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-SemiBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = JSON.stringify(location);
    const locationObject = JSON.parse(locationText);
    
  
    console.log(locationObject.latitude);
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_dG9nZXRoZXItdG9tY2F0LTI2LmNsZXJrLmFjY291bnRzLmRldiQ'}
    >
      <UserLocationContex.Provider value={{location,setLocation}} >
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* Display location information */}
        {/* <Text style={styles.locationText}>{locationText}</Text> */}
        
        {/* Render other components based on authentication status */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>

        <StatusBar style="auto" />
      </View>

      </UserLocationContex.Provider>
      
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25
  }
});

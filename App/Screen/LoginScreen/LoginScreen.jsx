import { View, Text ,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import Colors  from './../../Utils/Colors'
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
  import { useOAuth } from '@clerk/clerk-expo';
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress= async() => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
       
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
    }
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:80
    }}>
 <Image source={require('./../../../assets/images/logo.png')}
 style={styles.logoImage}
 />
 <Image source={require('./../../../assets/images/login-bg.png')}
 style={styles.bgImage}
 />
 <View style={{padding:20}}>
    <Text style={styles.heading}> Your Ultimate Ev Cgargiing station finder app</Text>
    <Text style={styles.desc}> Find EV charging station near me you, plan trip and so much more in just oone click</Text>
    <TouchableOpacity 
    onPress={onPress}>
        <Text style={styles.button}>
           Login With Google
        </Text>
    </TouchableOpacity>
 </View>
   
    </View>
  )
}


const styles = StyleSheet.create({
    logoImage: {
        width:200,
        height:40,
        objectFit:'contain'
    },
    bgImage:{
        width:'100%',
        height:200,
        marginTop:20,
        objectFit:'cover'
    },
    heading:{
        fontSize:25,
        fontFamily:'outfit-bold',
        textAlign:'center',
        marginTop:20
    },
    desc:{
        fontSize:17,
        fontFamily:'outfit',
        marginRight:15,
        textAlign:'center',
        color:Colors.GRAY
    },
    button:{
        textAlign:'center',
        backgroundColor:Colors.PRIMARY,
        padding:16,
        display:'flex',
        borderRadius:99,
        marginTop:40
    }
})
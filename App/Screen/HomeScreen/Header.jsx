import { View, Text,Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';

export default function Header() {
    const {user} = useUser();
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        

    }}>
      <Image source={{uri:user?.imageUrl}} style={{
        width:45,
        height:45,
        borderRadius:99
      }}/>
      <Image  source={require('./../../../assets/images/logo.png')}
      style={
        {
            width:200,
            height:45,
            borderRadius:'contain'
        }
      }
      />
      <Ionicons name="filter-sharp" size={24} color="black" />
    </View>
  )
}
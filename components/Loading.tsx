import React from 'react';
import Colours from '@/constants/Colors';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function Loading() { // TODO: make this a loading icon
  return (
    <View style={styles.container}>
        <ThemedText>Loading...</ThemedText> 
    </View>
  )
}


const styles: any = {
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: "scroll",
        backgroundColor: Colours.white,
        flex: 1,
        flexDirection: "column",
    }
}
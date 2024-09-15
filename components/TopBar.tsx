import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '@/constants/Colors';
import { Button } from '@rneui/base';
import MySearchBar from './SearchBar';



export default function TopBar() {
    return (
        <View
            style={styles.container}
        >
            <View style={{width: '80%'}}>
                <MySearchBar />
            </View>
            <Button title="Add" />
        </View>
    );
}

const styles: any = {
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Colours.dark4,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}


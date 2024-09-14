import * as React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';

export default function ExerciseListView({ exercise }: { exercise: any }) {


    return (
        <View
            style={styles.container}
        >
            <ThemedText>{exercise.name}</ThemedText>
            <ThemedText>{exercise.logs[0].date}</ThemedText>
            <ThemedText>{exercise.logs[0].comments}</ThemedText>
        </View>
    );
}


const styles: any = {
  container: {
    width: '90%',
    padding: 10,
    margin: 10,
    borderRadius: 30,
    backgroundColor: Colours.dark4,
    alignItems: "center",
  },
}



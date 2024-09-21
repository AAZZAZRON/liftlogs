import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';

export default function ExerciseListItem({ exercise }: { exercise: any }) {


    return (
      <TouchableOpacity onPress={() => console.log("HI")}>
        <View
            style={styles.container}
        >
          <View style={styles.left}>
            <ThemedText type="title">{exercise.name}</ThemedText>
            <ThemedText type="default">09/13 - 122x50, 122x50, 122x50</ThemedText>
            <ThemedText type="default">09/13 - 12x50, 12x50, 12x50</ThemedText>
            <ThemedText type="default">09/13 - 12x50, 12x50, 12x50</ThemedText>
          </View>
          <View style={styles.right}>
            <ThemedText type="big">+13</ThemedText>
            <ThemedText type="default" style={{textAlign: 'center'}}>Reps Since 03/13</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
}


const styles: any = {
  container: {
    width: '93%',
    padding: 10,
    margin: 8,
    borderRadius: 20,
    backgroundColor: Colours.y3,
    flexDirection: 'row',
  },

  left: {
    width: '70%',    
  },

  right: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
}



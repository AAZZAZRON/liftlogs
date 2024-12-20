import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import { EntryObject, ExerciseObject, SetObject } from '@/constants/types';
import { useRouter } from 'expo-router';

function parseEntry(entry: EntryObject): string {
    let s = entry.date.toString().substring(5).replace('-', '/');
    let arr = entry.sets.map((set: SetObject) => {return `${set.reps}x${set.weight}`}); 
    return s + ' - ' + arr.join(", ");
}

export default function ExerciseListItem({ exercise }: { exercise: ExerciseObject }) {
    const router = useRouter();

    const [firstEntries, setFirstEntries] = useState<EntryObject[]>();

    useEffect(() => {
        if (exercise.logs) setFirstEntries(exercise.logs.slice(0, 3));
    }, []);

    
    return (
        <TouchableOpacity onPress={() => router.push({pathname: `/ExerciseScreen`, params: {name: exercise.name, id: exercise.id}})}>
            <View
                style={styles.container}
            >
            <View style={styles.left}>
                <ThemedText type="title">{exercise.name}</ThemedText>
                {
                    (firstEntries !== undefined) ? 
                        (firstEntries.map((entry: EntryObject, id) => {
                            return <ThemedText type='default' key={id}>{parseEntry(entry)}</ThemedText>
                        }))
                    : <ThemedText type='default'>No logs yet...</ThemedText>
                }
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



import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import { EntryObject, ExerciseObject, SetObject, StatObject } from '@/constants/types';
import { useRouter } from 'expo-router';

function parseEntry(entry: EntryObject): string {
    let s = entry.date.toString().substring(5).replace('-', '/');
    let arr = entry.sets.map((set: SetObject) => {return `${set.reps}x${set.weight}`}); 
    return s + ' - ' + arr.join(", ");
}

export default function ExerciseListItem({ exercise, stat }: { exercise: ExerciseObject, stat: StatObject }) {
    const router = useRouter();
    const [firstEntries, setFirstEntries] = useState<EntryObject[]>();

    useEffect(() => {
        if (exercise.logs) setFirstEntries(exercise.logs.reverse().slice(0, 3));
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
                <OneRepMax stat={stat} />
            </View>
            </View>
        </TouchableOpacity>
    );
}

function OneRepMax({stat}: {stat: StatObject}) {
    if (stat == null || !stat.shownStats.includes("oneRepMax")) return <ThemedText>No 1RM...</ThemedText>
    const weight = stat.stats.oneRepMax.weight;
    const units = stat.stats.oneRepMax.units;
    const date = stat.stats.oneRepMax.date;

    return (
        <>
            <ThemedText type="title">{weight}{units}</ThemedText>
            <ThemedText type="default" style={{textAlign: 'center', lineHeight: 18}}>Achieved on {date.toString()}</ThemedText>
        </>
    )
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



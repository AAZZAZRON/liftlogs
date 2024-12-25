import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import ExerciseListItem from './ExerciseListItem';
import { ExerciseObject } from '@/constants/types';


export default function ExerciseList({data}: {data: ExerciseObject[]}) {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.exerciseList}
        >
            { data === undefined || data.length === 0 ? <ThemedText>No exercises...</ThemedText>
            :
                data.map((ex: ExerciseObject, id) => {
                    return <ExerciseListItem key={id} exercise={ex}/>
                })
            }
        </ScrollView>
    );
}

const styles: any = {
    container: {
        width: '100%',
        overflowY: "scroll",
        backgroundColor: Colours.white,
        flex: 1,
        flexDirection: "column",
    },

    exerciseList: {
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    }
}

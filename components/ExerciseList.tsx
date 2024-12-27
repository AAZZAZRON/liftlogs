import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import ExerciseListItem from './ExerciseListItem';
import { ExerciseObject } from '@/constants/types';
import { useApiContext } from '@/contexts/ApiProvider';


export default function ExerciseList() {
    const apiContext = useApiContext();
    const data = apiContext.exerciseData;
    const search = apiContext.search;

    // filter data from searchbar
    const filterData = (data: ExerciseObject[]) => {
        // TODO: make search better
        return data.filter((exercise: ExerciseObject) => search === '' || exercise.name.includes(search));
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.exerciseList}
        >
            { filterData(data).length === 0 ? <ThemedText>No exercises...</ThemedText>
            :
                filterData(data).map((ex: ExerciseObject, id) => {
                    return <ExerciseListItem key={id} id={ex.id} />
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

import React from 'react';
import { View, Text } from 'react-native';
import { EntryObject, SetObject } from '@/constants/types';
import { ThemedText } from './ThemedText';
import moment from 'moment';
import Colours from '@/constants/Colors';

export default function EntryItem({entry}: {entry: EntryObject}) {
    const formatDate = (dateStr: any) => {
        const [year, month, day] = dateStr.split('-');
        return moment(`${Number(year)}-${month}-${day}`).format('MMMM Do, YYYY');
    };

    const date = formatDate(entry.date);
    const sets = entry.sets;

    
    return (
        <View style={styles.container}>
            <ThemedText type={'defaultSemiBold'}>{date}</ThemedText>
            {
                sets.map((set, id) => <SetItem key={id} set={set} />)
            }
        </View>
    )
}

export function SetItem({set}: {set: SetObject}) {
    const notes = set.notes || '';
    const units = set.units || 'lbs'; 
    return (
        <View style={styles.setContainer}>
            <View style={styles.setContainerLeft}>
                <ThemedText style={styles.setText}>- {set.reps} x {set.weight}{units}</ThemedText>
            </View>
            <View style={styles.setContainerRight}>
                {(notes === '') ? <></> : <ThemedText style={styles.notesText}>Notes: {notes}</ThemedText>}
            </View>
        </View>
    )
}




const styles: any = {
    container: {
        backgroundColor: Colours.y3,
        width: '100%',
        margin: 5,
        padding: 10,
        borderRadius: 20,
    },
    setContainer: {
        marginHorizontal: 10,
        marginVertical: 2,
        // backgroundColor: Colours.y1,
        flexDirection: 'row',
    },
    
    setContainerLeft: {
        width: '35%',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingRight: 10,
    },
    
    setContainerRight: {
        width: '70%',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    setText: {
        lineHeight: 19,
    },
    notesText: {
        color: 'gray',
        lineHeight: 19,
    }
}

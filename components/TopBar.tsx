import React, {useState} from 'react';
import { Modal, Pressable, View, Button, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '@/constants/Colors';
import MySearchBar from './SearchBar';
import { ExerciseObject } from '@/constants/types';
import AddExerciseForm from './AddExerciseForm';



export default function TopBar({data, setDatalist, reload}: {data: ExerciseObject[], setDatalist: (data: any) => void, reload: () => void}) {
    const [addFormVisible, setAddFormVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.horizontalContainer}>
                <View style={{width: '80%'}}>
                    <MySearchBar data={data} setDatalist={setDatalist} />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => (setAddFormVisible(true))}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.endWorkoutButton}>
                <Text style={styles.buttonText}>End Current Workout</Text>
            </TouchableOpacity>
            <AddExerciseForm visible={addFormVisible} setVisible={setAddFormVisible} reload={reload} />
        </View>
    );
}

const styles: any = {
    container: {
        width: '100%',
        backgroundColor: Colours.y4,
        alignItems: "center",
        justifyContent: "center",
    },
    horizontalContainer: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: Colours.y4,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    addButton: {
        margin: 10,
        padding: 15,
        backgroundColor: Colours.y2,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    endWorkoutButton: {
        width: '90%',
        margin: 5,
        backgroundColor: Colours.red,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colours.darkText,
    },
}


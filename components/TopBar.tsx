import React, {useState, useContext} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Colours from '@/constants/Colors';
import MySearchBar from './SearchBar';
import { ExerciseObject } from '@/constants/types';
import AddExerciseForm from './AddExerciseForm';
import { WorkoutContext } from '@/contexts/WorkoutProvider';
import EndWorkoutForm from './EndWorkoutForm';
import StartWorkoutButton from './StartWorkoutButton';


export default function TopBar({data, setDatalist}: {data: ExerciseObject[], setDatalist: (data: any) => void}) {
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [endWorkoutVisible, setEndWorkoutVisible] = useState(false);

    const workoutContext = useContext(WorkoutContext);
    const workoutId = workoutContext?.workoutId;

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
            {workoutId === -1 ? 
                <StartWorkoutButton /> 
            : 
                <TouchableOpacity style={styles.endWorkoutButton} onPress={() => setEndWorkoutVisible(true)}>
                    <Text style={styles.buttonText}>End Current Workout</Text>
                </TouchableOpacity>
            }
            <AddExerciseForm visible={addFormVisible} setVisible={setAddFormVisible} />
            <EndWorkoutForm visible={endWorkoutVisible} setVisible={setEndWorkoutVisible} />
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


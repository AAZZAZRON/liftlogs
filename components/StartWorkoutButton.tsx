import { useContext } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import Colours from "@/constants/Colors";
import axios from "axios";
import { WorkoutContext } from "@/contexts/WorkoutProvider";

export default function StartWorkoutButton() {
    const workoutContext = useContext(WorkoutContext);
    const workoutId = workoutContext?.workoutId;
    const setWorkoutId = workoutContext?.setWorkoutId || ((id) => {return id});

    const startWorkout = () => {
        const createWorkout = async () => {
            const response = await axios.post(`http://10.0.0.211:5000/workouts/start`);
            if (response) {
                setWorkoutId(response.data.id);
                Alert.alert('Workout Begun!', '');
            };
        }

        createWorkout().catch((error) => {
            let message = error.response.data.description || Object.values(error.response.data.message)[0];
            Alert.alert(`Error Code ${error.response.status}`, message);
        });
    };

    return (
        <TouchableOpacity style={styles.startWorkoutButton} onPress={startWorkout}>
            <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
    )
}

const styles: any = {
    startWorkoutButton: {
        width: '90%',
        margin: 5,
        backgroundColor: Colours.green,
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


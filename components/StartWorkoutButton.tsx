import { TouchableOpacity, Text, Alert } from "react-native";
import Colours from "@/constants/Colors";
import axios from "axios";
import { useWorkoutContext } from "@/contexts/WorkoutProvider";

export default function StartWorkoutButton() {
    const workoutContext = useWorkoutContext();
    const setWorkoutId = workoutContext.setWorkoutId;

    const startWorkout = async () => {
        try {
            const response = await axios.post(`workouts/start`);
            setWorkoutId(await response.data.id);
        } catch (error: any) {
            let message = error.response.data.description || Object.values(error.response.data.message)[0];
            Alert.alert(`Error Code ${error.response.status}`, message);
        } finally {
            Alert.alert('Workout Begun!', '');
        }
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


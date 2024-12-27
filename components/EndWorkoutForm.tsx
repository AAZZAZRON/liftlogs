import React, { useState, useEffect } from 'react';
import { Modal, TextInput } from 'react-native';
import { ThemedText } from './ThemedText';
import { View, Button, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { useWorkoutContext } from '@/contexts/WorkoutProvider';


export default function EndWorkoutForm({visible, setVisible}: {visible: boolean, setVisible: (b: boolean) => void}) {
    const [formData, setFormData] = useState({
        id: '',
        notes: '',
    });
    const workoutContext = useWorkoutContext();
    const workoutId = workoutContext.workoutId;
    const setWorkoutId = workoutContext.setWorkoutId;

    const updateForm = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const submitForm = async () => {
        setVisible(false);
        try {
            const response = await axios.post(`http://10.0.0.211:5000/workouts/end`, formData);
            if (response) Alert.alert('Workout Ended', '');
        } catch (error: any) {
            Alert.alert(`Error Code ${error.response.status}`, error.response.data.description);
        } finally {
            setWorkoutId(-1);
        }
    };

    useEffect(() => {
        updateForm("id", workoutId.toString());
    }, [workoutId]);


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={styles.centerView}>
                    <View
                        style={styles.modalView}
                    >
                        <View style={styles.closeButton}>
                            <Button title="X" onPress={() => setVisible(false)}/>
                        </View>
                        <ThemedText type="defaultSemiBold">End Workout</ThemedText>
                        <View style={styles.formEntry}>
                            <Text style={styles.label}>Notes: </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Notes"
                                value={formData.notes}
                                multiline={true}
                                onChangeText={(value: string) => updateForm('notes', value)}
                            />
                        </View>
                        <View style={styles.submitButton}>
                            <Button title="End" onPress={submitForm}/>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles: any = {
    centerView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: '33%',
    },
    modalView: {
        width: '90%',
        marginTop: '10%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 35,
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
    submitButton: {
        marginBottom: 10,
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    formEntry: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        gap: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        height: 40,
        width: '70%',
        // overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    }
}
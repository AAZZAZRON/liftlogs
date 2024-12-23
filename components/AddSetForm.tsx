import React, { useState, useEffect } from 'react';
import { View, Button, Pressable, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import Colours from '@/constants/Colors';
import { Alert, Keyboard } from 'react-native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';


export default function AddSetForm({id, reload}: {id: string, reload: () => void}) {
    const defaultValue = {
        exercise_id: id,
        workout_id: 1, // TODO: wrap everything to start/end workout
        reps: '10',
        weight: '45',
        units: 'lbs',
        notes: '',
    };
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(defaultValue);

    const updateForm = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const submitForm = () => {
        var reps = formData.reps;
        var weight = formData.weight;

        setIsOpen(false);
        if (reps === "" || weight === "") {
            Alert.alert('Invalid Data', 'You forgot to fill out some fields.');
            return;
        }

        const putData = async () => {
            const response = await axios.post(`http://10.0.0.211:5000/addset`, formData);
            if (response) {
                Alert.alert('Set Created Succesfully', "Your set has been successfully created");
                reload();
            };
        }

        putData().catch((error) => {
            console.log(error.response.status, error.response.data);
            let message = error.response.data.description || Object.values(error.response.data.message)[0];
            Alert.alert(`Error Code ${error.response.status}`, message);
        }).then(() => setFormData(defaultValue));
    };

    return (
        <View style={styles.container}>
            {isOpen ?
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.closeSlider} onPress={() => setIsOpen(false)}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.formContainer}>
                            <View style={styles.formEntry}>
                                <Text style={styles.label}>Reps: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="10"
                                    value={formData.reps}
                                    keyboardType="numeric"
                                    onChangeText={(value: string) => updateForm('reps', value)}
                                />
                            </View>
                            <View style={styles.formEntry}>
                                <Text style={styles.label}>Weight: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="45"
                                    value={formData.weight}
                                    // keyboardType="numeric"
                                    onChangeText={(value: string) => updateForm('weight', value)}
                                />
                            </View>
                            <RadioButton.Group onValueChange={(units) => updateForm('units', units)} value={formData.units}>
                                <View style={styles.formEntry}>
                                    <RadioButton.Item style={styles.radioButton} label="lbs" value="lbs" />
                                    <RadioButton.Item style={styles.radioButton} label="kg" value="kg" />
                                </View>
                            </RadioButton.Group>
                            <View style={styles.formEntry}>
                                <Text style={styles.label}>Notes: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder=""
                                    value={formData.notes}
                                    multiline={true}
                                    onChangeText={(value: string) => updateForm('notes', value)}
                                />
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
                                <Text style={styles.buttonText}>Submit New Set</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            :
                <TouchableOpacity style={styles.addSetButton} onPress={() => setIsOpen(true)}>
                    <Text style={styles.buttonText}>Add New Set</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles: any = {
    container: {
        width: '100%',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    cardContainer: {
        width: '100%',
        backgroundColor: Colours.y1,
        alignItems: 'center',
        borderRadius: 15,
    },
    formContainer: {
        width: '100%',
        // backgroundColor: Colours.y1,
        alignItems: 'center',
        borderRadius: 15,
    },
    addSetButton: {
        width: '100%',
        padding: 10,
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
    submitButton: {
        width: '80%',
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
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
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colours.darkText,
    },
    radioButton: {
        borderColor: Colours.y2,
        borderWidth: 2, 
        borderRadius: 20,
    },
    closeSlider: {
        padding: 15,
        alignSelf: 'flex-start',
    },
    formEntry: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
    },
    input: {
        height: 40,
        width: '50%',
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    textInput: {
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
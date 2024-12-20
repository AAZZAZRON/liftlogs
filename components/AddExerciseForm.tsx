import React, {useState, useEffect} from 'react';
import { Modal, TextInput } from 'react-native';
import { ThemedText } from './ThemedText';
import { View, Button, Text, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function AddExerciseForm({visible, setVisible}: {visible: boolean, setVisible: (b: boolean) => void}) {
    const router = useRouter();
    const [reloadCount, setReloadCount] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
    });

    const updateForm = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const submitForm = () => {
        var name = formData.name;
        setVisible(false);
        if (name === "") {
            Alert.alert('Invalid Name', 'Please enter a unique exercise name.');
            return;
        }

        const putData = async () => {
            const response = await axios.put(`http://10.0.0.211:5000/exercise/create`, formData);
            if (response) {
                Alert.alert('Exercise Created', `${name} has been successfully created`);
                router.push({pathname: `/HomeScreen`, params: {reload: reloadCount}}); // reload screen
                setReloadCount(reloadCount + 1);
            };
        }

        putData().catch((error) => {
            // console.error(error.response.status, error.response.data);
            Alert.alert(`Error Code ${error.response.status}`, error.response.data.description);
        });
    };


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
                        <ThemedText type="defaultSemiBold">Add Exercise</ThemedText>
                        <View style={styles.formEntry}>
                            <Text style={styles.label}>Exercise Name: </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Exercise Name"
                                value={formData.name}
                                onChangeText={(value: string) => updateForm('name', value)}
                            />
                        </View>
                        <View style={styles.submitButton}>
                            <Button title="Submit" onPress={submitForm}/>
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
        margin: 20,
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
        width: '50%',
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    }
}
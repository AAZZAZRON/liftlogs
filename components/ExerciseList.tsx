import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import ExerciseListItem from './ExerciseListItem';
import axios from 'axios';
import { ExerciseObject } from '@/constants/types';


export default function ExerciseList() {
    const [data, setData] = useState([]);
    const BASE = process.env.API_URL;
    // console.log(BASE);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://10.0.0.211:5000/exercise/all');
            if (response) setData(response.data);
            console.log(data);
        }
        fetchData().catch(console.error);
    }, []);



    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.exerciseList}
        >
            { 
                data.map((ex: ExerciseObject, id) => {
                    console.log(ex.name);
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

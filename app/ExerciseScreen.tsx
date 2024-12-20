import React from "react";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, ScrollView } from "react-native";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router/build/hooks";


export default function ExerciseScreen() {
    const params = useGlobalSearchParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://10.0.0.211:5000/exercise/${params.id}`);
            if (response) {
                setData(response.data);
            }
            console.log(response.data);
        }
        fetchData().catch(console.error);
    }, []);


    return (
        <View>
            <ThemedText>{JSON.stringify(data)}</ThemedText>
        </View>
    )
}

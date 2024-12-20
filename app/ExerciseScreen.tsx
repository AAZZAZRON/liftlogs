import React from "react";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, ScrollView } from "react-native";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import Colours from "@/constants/Colors";
import AddSetForm from "@/components/AddSetForm";
import Loading from "@/components/Loading";


export default function ExerciseScreen() {
    const params = useGlobalSearchParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://10.0.0.211:5000/exercise/${params.id}`);
            if (response) {
                setData(response.data);
            }
            setIsLoading(false);
        }
        if (isLoading) fetchData().catch(console.error);
    }, [isLoading]);




    return (
        isLoading
        ?
            <Loading />
        :
            <View style={styles.container}>
                <AddSetForm id={Array.isArray(params.id) ? params.id[0] : params.id} setIsLoading={setIsLoading}/>
                <ThemedText>{JSON.stringify(data)}</ThemedText>
            </View>
    )
}




const styles: any = {
    container: {
      backgroundColor: Colours.white,
      flex: 1,
      alignItems: "center",
    },
  }
  
  
  
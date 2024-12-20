import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Text, View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Loading from "@/components/Loading";
import { useFocusEffect } from "expo-router";


export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datalist, setDatalist] = useState([]); // what the Exercise list gets

  const reload = () => setIsLoading(true);

  useEffect(() => {
      console.log("loading", isLoading);
      const fetchData = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/exercise/all`);
        if (response) {
          setData(response.data);
          setDatalist(response.data);
        }
        setIsLoading(false);
      }
      if (isLoading) fetchData().catch(console.error);
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      console.log("focus");
      reload();
      return () => {
        console.log("unfocus")
      };
    }, [])
  );

  return (
    isLoading ? 
      <Loading />
    :
      <View
        style={styles.container}
      >
        <TopBar data={data} setDatalist={setDatalist} reload={reload}/>
        <ExerciseList data={datalist} />
      </View>
  );
}



const styles: any = {
  container: {
    backgroundColor: Colours.white,
    flex: 1,
    alignItems: "center",
  },
}



import { useState, useEffect } from "react";
import axios from "axios";
import { Text, View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Loading from "@/components/Loading";

export default function HomeScreen() {
  const params = useLocalSearchParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datalist, setDatalist] = useState([]); // what the Exercise list gets

  useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get(`http://10.0.0.211:5000/exercise/all`);
          if (response) {
            setData(response.data);
            setDatalist(response.data);
          }
      }
      fetchData().catch(console.error);
      setIsLoading(false);
  }, [params.reload]);


  return (
    isLoading ? 
      <Loading />
    :
      <View
        style={styles.container}
      >
        <TopBar data={data} setDatalist={setDatalist} />
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



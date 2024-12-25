import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { Text, View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import { useFocusEffect } from "expo-router";
import { ReloadContext } from "@/contexts/ReloadProvider";


export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [datalist, setDatalist] = useState([]); // what the Exercise list gets
  const reloadContext = useContext(ReloadContext);
  const reload = reloadContext?.reload;
  const setReload = reloadContext?.setReload || ((id) => {return id});

  useEffect(() => {
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


  useEffect(() => {
    console.log("reload", reload);
    if (reload) {
      setIsLoading(true);
      setReload(false);
    }
  }, [reload]);


  return (
    isLoading ? 
      <Loading />
    :
      <View
        style={styles.container}
      >
        <TopBar data={data} setDatalist={setDatalist}/>
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



import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import { ReloadContext } from "@/contexts/ReloadProvider";


export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);
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
      }

      const fetchStats = async () => {
        const response = await axios.get(`http://10.0.0.211:5000/stats/all`);
        if (response) {
          setStats(response.data);
        }
      }

      if (isLoading) {
        fetchData().catch(console.error);
        fetchStats().catch(console.error);
        setIsLoading(false);
      }
  }, [isLoading]);

  useEffect(() => {
    if (reload) {
      setIsLoading(true);
      setReload(false);
    }
  }, [reload]);

  return (
    isLoading ? 
      <Loading />
    :
      <View style={styles.container}>
        <TopBar data={data} setDatalist={setDatalist}/>
        <ExerciseList data={datalist} stats={stats} />
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

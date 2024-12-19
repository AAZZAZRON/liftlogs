import { useState, useEffect } from "react";
import axios from "axios";
import { Text, View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";

export default function Index() {
  const [data, setData] = useState([]);
  const [datalist, setDatalist] = useState([]); // what the Exercise list gets


  useEffect(() => {
      const fetchData = async () => {
          const response = await axios.get(`http://10.0.0.211:5000/exercise/all`);
          if (response) {
            setData(response.data);
            setDatalist(response.data);
          }
          console.log(data);
      }
      fetchData().catch(console.error);
  }, []);


  return (
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
    justifyContent: "center",
    alignItems: "center",
  },
}



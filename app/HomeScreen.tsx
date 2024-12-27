import { useState, useEffect } from "react";
import { View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import { useHomeApiContext } from "@/contexts/HomeApiProvider";

export default function HomeScreen() {
    const apiContext = useHomeApiContext();
    const data = apiContext.exerciseData;
    const stats = apiContext.statsData;
    const loading = apiContext.loading;
    const [datalist, setDatalist] = useState(data); // what the Exercise list gets

    useEffect(() => {
        if (!loading) setDatalist(data);
    }, [loading]);

    return (
        loading ? <Loading />
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

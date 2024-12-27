import { View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import { useHomeApiContext } from "@/contexts/HomeApiProvider";

export default function HomeScreen() {
    const apiContext = useHomeApiContext();
    const loading = apiContext.loading;
    return (
        loading ? <Loading />
        :
        <View style={styles.container}>
            <TopBar />
            <ExerciseList />
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

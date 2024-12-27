import { View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";
import TopBar from "@/components/TopBar";
import Loading from "@/components/Loading";
import { useApiContext } from '@/contexts/ApiProvider';

export default function HomeScreen() {
    const apiContext = useApiContext();
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

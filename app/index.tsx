import { Text, View } from "react-native";
import Colours from "@/constants/Colors";
import ExerciseList from "@/components/ExerciseList";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      {/* <Text>Index</Text> */}
      <ExerciseList />

    </View>
  );
}



const styles: any = {
  container: {
    backgroundColor: Colours.dark4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}



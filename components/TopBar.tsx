import React, {useState} from 'react';
import { Modal, Pressable, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '@/constants/Colors';
import { Button } from '@rneui/base';
import MySearchBar from './SearchBar';
import { ExerciseObject } from '@/constants/types';
import AddExerciseForm from './AddExerciseForm';



export default function TopBar({data, setDatalist, reload}: {data: ExerciseObject[], setDatalist: (data: any) => void, reload: () => void}) {
    const [addFormVisible, setAddFormVisible] = useState(false);

    return (
        <View
            style={styles.container}
        >
            <View style={{width: '80%'}}>
                <MySearchBar data={data} setDatalist={setDatalist} />
            </View>
            <Button title="Add" onPress={() => setAddFormVisible(true)}/>
            <AddExerciseForm visible={addFormVisible} setVisible={setAddFormVisible} reload={reload} />
        </View>
    );
}

const styles: any = {
  container: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: Colours.y4,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
}


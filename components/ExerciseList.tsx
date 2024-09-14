import React from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import ExerciseListView from './ExerciseListView';

export default function ExerciseList() {

    var data = [
        {
          id: 1,
          name: "Bench Press",
          logs: [
            {
              date: "2021-09-03",
              sets: {
                1: {
                  reps: 12,
                  weight: 70
                },
                2: {
                  reps: 12,
                  weight: 50
                },
                3: {
                  reps: 12,
                  weight: 50
                }
              },
              comments: "This was a good workout"
            },
            {
              date: "2021-09-01",
              sets: {
                1: {
                  reps: 12,
                  weight: 50
                },
                2: {
                  reps: 12,
                  weight: 50
                },
                3: {
                  reps: 12,
                  weight: 50
                }
              },
              comments: "This was a good workout 2"
            }
          ],
        },
        {
          id: 2,
          name: "Squat",
          logs: [
            {
              date: "2021-09-03",
              sets: {
                1: {
                  reps: 12,
                  weight: 70
                },
                2: {
                  reps: 12,
                  weight: 50
                },
                3: {
                  reps: 12,
                  weight: 50
                }
              },
              comments: "This was a good workout"
            },
            {
              date: "2021-09-01",
              sets: {
                1: {
                  reps: 12,
                  weight: 50
                },
                2: {
                  reps: 12,
                  weight: 50
                },
                3: {
                  reps: 12,
                  weight: 50
                }
              },
              comments: "This was a good workout 2"
            }
          ],
        }
    ];
    data = data.concat(data);
    data = data.concat(data);
    data = data.concat(data);



    return (
        <View
            style={styles.container}
        >
            <ThemedText>Edit components/ExerciseList.tsx to edit this screen.</ThemedText>
            {
                data.map((ex, id) => {
                  console.log(ex.name);
                    return (
                        <ExerciseListView key={id} exercise={ex}/>
                    )
                })
            }
        </View>
    );
}

const styles: any = {
    container: {
        width: '100%',
        minHeight: '100%',
        overflowY: "scroll",
        backgroundColor: Colours.dark2,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
}
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ThemedText } from './ThemedText';
import Colours from '../constants/Colors';
import ExerciseListItem from './ExerciseListItem';

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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.exerciseList}
        >
            {
                data.map((ex, id) => {
                  console.log(ex.name);
                    return (
                        <ExerciseListItem key={id} exercise={ex}/>
                    )
                })
            }
        </ScrollView>
    );
}

const styles: any = {
    container: {
        width: '100%',
        overflowY: "scroll",
        backgroundColor: Colours.dark2,
        flex: 1,
        flexDirection: "column",
    },

    exerciseList: {
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
    }
}

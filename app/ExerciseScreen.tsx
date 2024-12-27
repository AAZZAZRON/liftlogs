import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import Colours from "@/constants/Colors";
import AddSetForm from "@/components/AddSetForm";
import Loading from "@/components/Loading";
import { EntryObject } from "@/constants/types";
import EntryItem from "@/components/EntryItem";
import StatsSection from "@/components/StatsSection";
import { useApiContext } from '@/contexts/ApiProvider';


export default function ExerciseScreen() {
    const params = useGlobalSearchParams();
    const id: string = Array.isArray(params.id) ? params.id[0] : params.id;

    const apiContext = useApiContext();
    const loading = apiContext.loading;
    const data = apiContext.getExercise(id);
    const stats = apiContext.getStat(id);
    const logs = data.logs.reverse();

    return (
        loading
        ?
            <Loading />
        :
            <View style={styles.container}>
                <AddSetForm id={id} />
                <ScrollView style={styles.cardContainer}>
                    {
                        stats && stats?.shownStats.length !== 0 ? 
                        <>
                            <ThemedText type={'subtitle'}>Stats:</ThemedText>
                            <StatsSection stats={stats}/>
                        </>
                        : <></>
                    }
                    <ThemedText type={'subtitle'}>Recent Logs</ThemedText>
                    <View style={styles.entryItems}>
                        {   
                            logs === undefined || logs.length === 0 
                        ? 
                            <ThemedText>You have no logs yet!</ThemedText> 
                        :
                            logs.map((en: EntryObject, id: any) => {
                                return <EntryItem key={id} entry={en}/>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
    )
}


const styles: any = {
    container: {
        backgroundColor: Colours.white,
        flex: 1,
        alignItems: "center",
    },
    cardContainer: {
        height: '100%',
        width: '100%',
        padding: 10,
    },
    
    entryItems: {
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        // paddingTop: 20,
        paddingBottom: 20,
    }
  }
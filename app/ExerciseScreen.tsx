import React from "react";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { View, ScrollView } from "react-native";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import Colours from "@/constants/Colors";
import AddSetForm from "@/components/AddSetForm";
import Loading from "@/components/Loading";
import { EntryObject, StatObject } from "@/constants/types";
import EntryItem from "@/components/EntryItem";
import StatsSection from "@/components/StatsSection";


export default function ExerciseScreen() {
    const params = useGlobalSearchParams();
    const [data, setData] = useState<{ logs: EntryObject[] } | null>(null);
    const [stats, setStats] = useState<StatObject | null>(null);
    const [logs, setLogs] = useState<EntryObject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const reload = () => setIsLoading(true);

    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`http://10.0.0.211:5000/stats/${params.id}`);
            if (response) {
                setStats(response.data);
            }
        }

        const fetchData = async () => {
            const response = await axios.get(`http://10.0.0.211:5000/exercise/${params.id}`);
            if (response) {
                setData(response.data);
                setLogs(response.data.logs.reverse());
            }
        }

        if (isLoading) {
            fetchStats().catch(console.error);
            fetchData().catch(console.error);
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        isLoading
        ?
            <Loading />
        :
            <View style={styles.container}>
                <AddSetForm id={Array.isArray(params.id) ? params.id[0] : params.id} reload={reload}/>
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
                            logs.map((en: EntryObject, id) => {
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
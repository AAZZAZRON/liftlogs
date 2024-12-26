import React from 'react';
import { View } from 'react-native'
import { ThemedText } from './ThemedText'
import Colours from '@/constants/Colors'
import { StatObject } from '@/constants/types'

export default function StatsSection({stats}: {stats: StatObject | null}) {
    const hasOneRepMax = stats?.shownStats.includes("oneRepMax");
    const hasVpmWeek = stats?.shownStats.includes("vpwWeek");
    const hasVpmMonth = stats?.shownStats.includes("vpwMonth");

    const rmW = stats?.stats.oneRepMax.weight;
    const rmU = stats?.stats.oneRepMax.units;
    const rmD = stats?.stats.oneRepMax.date;

    const vpwTW = stats?.stats.volumePerWorkout.thisWeek;
    const vpwLW = stats?.stats.volumePerWorkout.lastWeek;
    const vpwTM = stats?.stats.volumePerWorkout.thisMonth;
    const vpwLM = stats?.stats.volumePerWorkout.lastMonth;

    var weekPct, monthPct;
    if (vpwTW && vpwLW) weekPct = Math.round(vpwTW / vpwLW * 1000) / 10.0 + '%';
    if (vpwTM && vpwLM) monthPct = Math.round(vpwTM / vpwLM * 1000) / 10.0 + '%';

    return (
        <View style={styles.container}>
            <View style={styles.statContainer}>
                <ThemedText type={'subtitle'} style={styles.title}>One Rep Max</ThemedText>
                <View style={styles.statBody}>
                    <ThemedText style={{fontSize: 16.5}}>You were able to lift {rmW}{rmU} for the first time on {rmD?.toString()}!</ThemedText>
                </View>
            </View>

            <View style={styles.statContainer}>
                <ThemedText type={'subtitle'} style={styles.title}>Volume Per Workout</ThemedText>
                {hasVpmWeek ? 
                    <View style={styles.statBody}>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>Last Week</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{vpwLW}</ThemedText><ThemedText style={{fontSize: 16}}> lbs</ThemedText>
                            </View>
                        </View>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>This Week</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{vpwTW}</ThemedText><ThemedText style={{fontSize: 16}}> lbs</ThemedText>
                            </View>
                        </View>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>% Increase</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{weekPct}</ThemedText>
                            </View>
                        </View>
                    </View>
                : <></>}
                {hasVpmMonth ? 
                    <View style={styles.statBody}>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>Last Month</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{vpwLM}</ThemedText><ThemedText style={{fontSize: 16}}> lbs</ThemedText>
                            </View>
                        </View>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>This Month</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{vpwTM}</ThemedText><ThemedText style={{fontSize: 16}}> lbs</ThemedText>
                            </View>
                        </View>
                        <View style={styles.statCell}>
                            <ThemedText type='default' style={{fontSize: 17}}>% Increase</ThemedText>
                            <View style={styles.statCellNum}>
                                <ThemedText type='subtitle'>{monthPct}</ThemedText>
                            </View>
                        </View>
                    </View>
                : <></>}
            </View>
        </View>
    )
}

const styles: any = {
    container: {
        backgroundColor: Colours.y4,
        margin: 5,
        padding: 10,
        borderRadius: 20,
        flexDirection: "column",
        // alignItems: "center",
    },
    statContainer: {
        marginVertical: 2,
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
    },
    statBody: {
        margin: 3,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCell: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statCellNum: {
        alignSelf: 'center',
        flexDirection: 'row',
    }
}

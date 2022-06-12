import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {Pedometer} from "expo-sensors";

import dummyData from "./dummy-data";
import * as SecureStore from "expo-secure-store";

const Card = (props) => {
    return (
        <View style={styles.cardContainer}>
            <Pressable
                onPress={() => props.navigation.navigate("FlanearsList", { slot: props.slot })}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1.0
                    },
                    styles.card
                ]}
            >
                <FontAwesome5 name={"plus"} size={40} />
            </Pressable>
            <Text style={styles.cardIncome}>
                +{props.earned.toFixed(2)} {props.earned !== 0 && "KRK"}
            </Text>
            {
                props.isActive &&
                <View
                    style={
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 10
                        }
                    }
                >
                    <Text style={[styles.InterSemiBold, { marginRight: 10 }]}>
                        {props.steps}/{props.stepsLimit}
                    </Text>
                    <Foundation name={"foot"} size={15} color={"#2F2B04"}/>
                </View>
            }
        </View>
    );
}

const Stack = createNativeStackNavigator();

const Home = (props) => {
    const [steps, setSteps] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

    useEffect(() => {
        SecureStore.getItemAsync("steps").then(s => {
            const sn = parseInt(s);
            if (sn)
                setSteps(sn);
        });

        Pedometer.getPermissionsAsync().then(r => {
            Pedometer.requestPermissionsAsync().then(_r => {
                Pedometer.isAvailableAsync().then(result => {
                    setIsPedometerAvailable(result);
                    Pedometer.watchStepCount(_result => {
                        setSteps(_result.steps);
                    });
                }, error => {
                    console.error('Could not get isPedometerAvailable: ' + error);
                    setIsPedometerAvailable(false);
                });
            })
        });
    }, []);

    useEffect(() => {
        SecureStore.setItemAsync('steps', steps.toString());
    }, [steps]);

    return (
        <View style={styles.container}>
            <View style={styles.steps}>
                <Text style={styles.stepCounter}>{steps}</Text>
                <Foundation name={"foot"} size={45} color={"#2F2B04"}/>
            </View>
            <View style={styles.income}>
                <Text style={[styles.InterSemiBold, { fontSize: 19, color: "#A6A498" }]}>
                    You've earned ${steps / 1000} KRK today!
                </Text>
            </View>
            <View style={styles.flanearPicker}>
                <View style={styles.pickerText}>
                    <Text style={[styles.InterSemiBold, { textAlign: "center", fontSize: 17 }]}>
                        Pick the Flanear for your next journey!
                    </Text>
                    <Text style={[styles.InterSemiBold, { textAlign: "center", fontSize: 17 }]}>
                        If you don't have one, you can get it via in-app marketplace
                    </Text>
                </View>
                <View style={styles.slots}>
                    <Card
                        earned={23}
                        isActive={true}
                        steps={230}
                        stepsLimit={700}
                        navigation={props.navigation}
                        slot={1}
                    />
                    <Card earned={0} isActive={false} navigation={props.navigation} slot={2}/>
                    <Card earned={0} isActive={false} navigation={props.navigation} slot={3}/>
                </View>
            </View>
        </View>
    );
}

const Item = ({ stats, slot, navigation }) => {
    return(
        <Pressable
            style={({ pressed }) => [
                { opacity: pressed ? 0.7 : 1.0 },
                styles.listItem
            ]
            }
            onPress={() => navigation.navigate("FlanearSetter", { stats: stats, slot: slot})}
        >
            <Image style={styles.flanearImage} />
            <View style={{flexDirection: "column", flex: 1, justifyContent: "space-evenly"}}>
                <Text style={[styles.InterSemiBold, { fontSize: 20 }]}>Flanear {stats.id}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Foundation name={"foot"} size={23} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Steps per energy</Text>
                    </View>
                    <Text>{stats.stepsPerEnergy}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"cash-plus"} size={15} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Income</Text>
                    </View>
                    <Text>{stats.income}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Entypo name={"back-in-time"} size={15} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Recovery Time</Text>
                    </View>
                    <Text>{stats.recoveryTime}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"lightning-bolt"} size={15} />
                        <Text style={styles.stat}>Energy left</Text>
                    </View>
                    <Text>{stats.energy}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const FlanearsList = (props) => {

    const renderItem = ({ item }) => {
        return <Item stats={item} navigation={props.navigation} slot={props.route.params.slot}/>;
    }

    return (
        <View style={[styles.container, { padding: 10, paddingBottom: 0 }]}>
            <Text style={[styles.InterSemiBold, styles.listCaption]}>Set the Flanear (Slot {props.route.params.slot})</Text>
            <View style={{flex: 1}}>
                <FlatList
                    data={dummyData.data}
                    renderItem={renderItem}
                    keyExtractor={stats => stats.id}
                />
            </View>
        </View>
    );
}

const SetButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.7 : 1.0
                },
                {
                    width: 300,
                    height: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#929062",
                    marginTop: 5
                }
            ]
            }
            onPress={() => props.navigation.navigate("Home", { assign: props.slot })}
        >
            <Text style={{fontFamily: "Inter_600SemiBold", color: "#FFF", fontSize: 20}}>Set</Text>
        </Pressable>
    );
}

const FlanearSetter = (props) => {

    const stats = props.route.params.stats;
    const slot = props.route.params.slot;

    return (
        <View style={[styles.container, { padding: 10, flexDirection: "column", alignItems: "center" }]}>
            <Text style={[styles.InterSemiBold, styles.listCaption, { marginBottom: 10 }]}>
                Flanear {stats.id}
            </Text>
            <Image style={styles.flanearImageBig}/>
            <View style={{ height: "10%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <MaterialCommunityIcons name={"lightning-bolt"} size={30} />
                <Text style={[styles.InterSemiBold, {fontSize: 18}]}>{stats.energy} energy left</Text>
            </View>
            <View style={{width: "80%", height: "15%", justifyContent: "space-between", flexDirection: "column" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Foundation name={"foot"} size={23} color={"#2F2B04"}/>
                        <Text style={[styles.stat, styles.InterSemiBold]}>Steps per energy</Text>
                    </View>
                    <Text>{stats.stepsPerEnergy}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"cash-plus"} size={15} color={"#2F2B04"}/>
                        <Text style={[styles.stat, styles.InterSemiBold]}>Income</Text>
                    </View>
                    <Text>{stats.income}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Entypo name={"back-in-time"} size={15} color={"#2F2B04"}/>
                        <Text style={[styles.stat, styles.InterSemiBold]}>Recovery Time</Text>
                    </View>
                    <Text>{stats.recoveryTime}</Text>
                </View>
            </View>
            <SetButton navigation={props.navigation} slot={slot}/>
        </View>
    );
}

export default function Stats() {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="FlanearsList" component={FlanearsList} />
            <Stack.Screen name="FlanearSetter" component={FlanearSetter} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F0DF"
    },

    steps: {
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    stepCounter: {
        fontSize: 45,
        fontFamily: "Inter_600SemiBold",
        marginRight: 15
    },

    income: {
        justifyContent: "center",
        alignItems: "center"
    },

    InterSemiBold: {
        fontFamily: "Inter_600SemiBold"
    },

    flanearPicker: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column"
    },

    slots: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },

    card: {
        backgroundColor: "#CDCD9A",
        borderWidth: 4,
        borderColor: "#2F2B04",
        borderRadius: 20,
        height: 130,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },

    pickerText: {
        width: "85%"
    },

    cardContainer: {
        flexDirection: "column"
    },

    cardIncome: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 17,
        marginTop: 10,
        textAlign: "center",
        width: 100
    },

    listCaption: {
        width: "100%",
        textAlign: "center",
        fontSize: 24,
    },

    listItem: {
        width: "100%",
        height: 130,
        flexDirection: "row",
        marginVertical: 10
    },

    flanearImage: {
        height: "100%",
        width: 100,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "#2F2B04",
        marginRight: 5,
        resizeMode: "stretch"
    },

    flanearImageBig: {
        height: "55%",
        width: "70%",
        borderWidth: 4,
        resizeMode: "stretch"
    },

    stat: {
        fontSize: 15,
        fontFamily: "Inter_400Regular",
        marginLeft: 5
    }
})
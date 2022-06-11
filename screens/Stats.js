import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { SafeAreaView } from "react-native-safe-area-context";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Card = (props) => {
    return (
        <View style={styles.cardContainer}>
            <Pressable 
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

export default function Inventory() {
    return (
            <View style={styles.container}>
                <View style={styles.steps}>
                    <Text style={styles.stepCounter}>10,000</Text>
                    <Foundation name={"foot"} size={45} color={"#2F2B04"}/>
                </View>
                <View style={styles.income}>
                    <Text style={[styles.InterSemiBold, { fontSize: 19, color: "#A6A498" }]}>
                        You've earned 1000 KRK today!
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
                        <Card earned={23} isActive={true} steps={230} stepsLimit={700}/>
                        <Card earned={0} isActive={false}/>
                        <Card earned={0} isActive={false}/>
                    </View>
                </View>
            </View>
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
    }
})
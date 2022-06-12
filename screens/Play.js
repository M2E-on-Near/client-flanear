import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {WebView} from "react-native-webview";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ScrollView} from "react-native-web";

const ComingSoonButton = () => {
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
                    backgroundColor: "#a6a470",
                    alignSelf: "center"
                }
            ]
            }
        >
            <Text style={{fontFamily: "Inter_600SemiBold", color: "#FFF", fontSize: 20}}>Coming soon</Text>
        </Pressable>
    );
}
const PlayButton = (props) => {
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
                    alignSelf: "center"
                }
            ]
            }
            onPress={() => props.navigation.navigate("List")}
        >
            <Text style={{fontFamily: "Inter_600SemiBold", color: "#FFF", fontSize: 20}}>Play</Text>
        </Pressable>
    );
}

const List = (props) => {
    return (
        <View style={styles.container}>
            <WebView source={{uri: 'https://flanear.github.io/dino?img=https://raw.githubusercontent.com/M2E-on-Near/token-images/main/80.png'}} style={{height: 300, width: 400}} />
        </View>
    );
}

const Home = (props) => {
    return (
        <View style={[styles.container, styles.flexCenter]}>
            <View style={styles.play}>
                <Text style={[styles.InterSemiBold, { fontSize: 24, marginBottom: 10 }]}>Flanear race</Text>
                <Text style={[styles.InterSemiBold, { fontSize: 17 }]}>Go further than another user in an arcade action game and earn FLAN</Text>
                <PlayButton navigation={props.navigation}/>
            </View>
            <View style={styles.play}>
                <Text style={[styles.InterSemiBold, { fontSize: 24, marginBottom: 10 }]}>Flanear chess</Text>
                <Text style={[styles.InterSemiBold, { fontSize: 17 }]}>Overplay another user in chess, given that the number of moves is tied to the steps taken per day</Text>
                <ComingSoonButton />
            </View>
            <View style={styles.play}>
                <Text style={[styles.InterSemiBold, { fontSize: 24, marginBottom: 10 }]}>Flanear sea battle </Text>
                <Text style={[styles.InterSemiBold, { fontSize: 17 }]}>Overplay another user in sea battle, given that the number of moves is tied to the steps taken per day</Text>
                <ComingSoonButton />
            </View>
            {/*<View style={styles.play}>*/}
            {/*    <Text style={[styles.InterSemiBold, { fontSize: 24, marginBottom: 10 }]}>Flanear 3D runner</Text>*/}
            {/*    <Text style={[styles.InterSemiBold, { fontSize: 17 }]}>Overplay another user in the runner, given that the distance you can run, is tied to the steps taken per day</Text>*/}
            {/*    <ComingSoonButton />*/}
            {/*</View>*/}
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function Play() {
    // return (
    //     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //         {/*TODO make it fullscreen on separate page*/}
    //         <WebView source={{uri: 'https://flanear.github.io/dino?img=https://raw.githubusercontent.com/M2E-on-Near/token-images/main/80.png'}} style={{height: 300, width: 400}} />
    //     </View>
    // );
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F0DF",
        padding: 10,
    },

    flexCenter: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    play: {
        width: "100%",
        height: 200,
        backgroundColor: "#CDCD9A",
        borderWidth: 4,
        borderColor: "#2F2B04",
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: 10,
        marginBottom: 15,
    },

    InterSemiBold: {
        fontFamily: "Inter_600SemiBold"
    }
});

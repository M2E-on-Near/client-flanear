import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

async function enter() {
    await SecureStore.setItemAsync("logged", "true");
}

export default function Auth() {

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.header}>Welcome to Flanears!</Text>
                <Text style={styles.underHeader}>Connect your wallet to begin</Text>
            </View>
            <Pressable 
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1.0
                    },
                    styles.walletButton
                ]}
                onPress={() => enter()}
            >
                <Text 
                    style={{ color: "#FFF", fontSize: 20, fontFamily: "Inter_600SemiBold" }}
                >
                    Connect Wallet
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#F3F0DF"
    },

    header: {
        fontSize: 20,
        fontFamily: "Inter_700Bold",
        color: "#2D2B07",
        marginBottom: 20
    },

    underHeader: {
        fontSize: 17,
        fontFamily: "Inter_600SemiBold",
        color: "#2D2B07"
    },

    walletButton: {
        width: 300,
        height: 50,
        backgroundColor: "#0072CE",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});
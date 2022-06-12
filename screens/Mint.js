import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const MintButton = (props) => {
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
                }
            ]
            }
        >
            <Text style={{fontFamily: "Inter_600SemiBold", color: "#FFF", fontSize: 20}}>Get</Text>
        </Pressable>
    );
}

export default function Mint() {
    return (
        <View style={styles.container}>
            <Text style={[styles.InterSemiBold, { width: "90%", textAlign: "center", fontSize: 20, marginBottom: 40 }]}>
                You need Flanears NFT's to battle with other players and earn tokens
            </Text>
            <MintButton />
        </View>
    );
}

const styles = StyleSheet.create({
    InterSemiBold: {
        fontFamily: "Inter_600SemiBold"
    },

    container: {
        flex: 1,
        backgroundColor: "#F3F0DF",
        alignItems: "center",
        justifyContent: "center"
    },
});
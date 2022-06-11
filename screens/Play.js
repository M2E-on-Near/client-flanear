import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {WebView} from "react-native-webview";

export default function Inventory() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {/*TODO make it fullscreen on separate page*/}
            <WebView source={{uri: 'https://m2e-on-near.github.io/dino'}} style={{height: 300, width: 400}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
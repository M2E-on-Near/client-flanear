import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {WebView} from "react-native-webview";
import React, {useState} from "react";

export default function Header() {
    const [krkBalance, setKrkBalance] = useState(30);
    const [showKrkWebView, setShowKrkWebView] = useState(true);
    const updateKrkBalance = () => setShowKrkWebView(s => !s);
    return (
        <SafeAreaView style={{ backgroundColor: "#F3F0DF" }}>
            <View style={styles.header}>
                <View style={[styles.box, { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]}>
                    <Image
                        source={require("../assets/KRKicon.png")}
                        style={{width: 30, height: 30, resizeMode: "stretch"}}
                    />
                    <Text style={[styles.InterSemiBold, { fontSize: 20 }]} onPress={updateKrkBalance}>{krkBalance}</Text>
                </View>
                <View style={[styles.box, { borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }]}>
                    <Text style={[styles.InterSemiBold, { fontSize: 20 }]}>3</Text>
                    <Image
                        source={require("../assets/fla-near-icon.png")}
                        style={{width: 30, height: 30, resizeMode: "stretch"}}
                    />
                </View>
            </View>
            {showKrkWebView &&
            <WebView source={{uri: 'http://flanear.github.io/bridge?action=ft_balance'}} style={{display: 'none'}}
            // <WebView source={{uri: 'http://192.168.0.141:3000?action=ft_balance'}} style={{display: 'none'}}
                     onMessage={(event) => {
                         // alert(event.nativeEvent.data);
                         setKrkBalance(event.nativeEvent.data);
                     }}
            />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
    },

    box: {
        width: 150,
        height: 50,
        backgroundColor: "#CDCD9A",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    InterSemiBold: {
        fontFamily: "Inter_600SemiBold"
    }
})
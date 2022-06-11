import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import dummyData from "./dummy-data.js";

const ImproveButton = (props) => {
    return (
        <Pressable 
            style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.7 : 1.0
                    },
                    {
                        width: 70,
                        height: 30,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#929062",
                        marginLeft: 7
                    }
                ]
            }
        >
            <Text style={{fontFamily: "Inter_600SemiBold", color: "#FFF"}}>Improve</Text>
        </Pressable>
    );
}

export default function Inventory() {

    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const pageRef = useRef(null);

    useEffect(() => {
        fetch(`https://picsum.photos/v2/list?page=${Math.ceil(Math.random() * 5)}&limit=4`)
            .then(res => res.json())
            .then(data => setImages(data));
    }, []);

    const inventoryItems = images.map((elem) =>
        <View style={styles.page}>
            <Image source={{ uri: elem.download_url }} style={{resizeMode: "stretch", width: "70%", height: "60%"}} />
        </View>
    );

    function changeStats(e) {
        setCurrentPage(e.nativeEvent.position);
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 3, flexDirection: "row"}}>
                <View style={{justifyContent: "center"}}>
                    <SimpleLineIcons name={"arrow-left"} size={40} />
                </View>
                <PagerView 
                    style={styles.carousel}
                    initialPage={0}
                    showPageIndicator={true}
                    onPageSelected={changeStats}
                    ref={pageRef}
                >
                    {inventoryItems}
                </PagerView>
                <View style={{justifyContent: "center"}}>
                    <SimpleLineIcons name={"arrow-right"} size={40} />
                </View>
            </View>
            <View style={styles.stats}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Foundation name={"foot"} size={23} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Steps per energy</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.stat}>{dummyData.data[currentPage].stepsPerEnergy}</Text>
                        <ImproveButton />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name={"cash-plus"} size={15} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Income</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.stat}>{dummyData.data[currentPage].income}</Text>
                        <ImproveButton />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%"}}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        
                        <Entypo name={"back-in-time"} size={15} color={"#2F2B04"}/>
                        <Text style={styles.stat}>Recovery time</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.stat}>{dummyData.data[currentPage].recoveryTime} h</Text>
                        <ImproveButton />
                    </View>
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

    carousel: {
        flex: 1
    },

    page: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"row",
    },

    stats: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column"
    },

    InterRegular: {
        fontFamily: "Inter_400Regular"
    },

    stat: {
        fontSize: 19,
        fontFamily: "Inter_400Regular",
        marginLeft: 5
    }
});
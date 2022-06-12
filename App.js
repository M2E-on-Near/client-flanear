import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import * as SecureStore from "expo-secure-store";

import Mint from "./screens/Mint";
import Inventory from "./screens/Inventory";
import Stats from "./screens/Stats";
import Play from "./screens/Play";
import Auth from "./screens/Auth";

import Header from "./util/Header"

const Tabs = createBottomTabNavigator();

function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      // await SecureStore.setItemAsync("logged", "false");
      const loginStatus = await SecureStore.getItemAsync("logged");
      if (loginStatus === "true")
        setIsLoggedIn(true);
    };

    bootstrap();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <Auth setIsLoggedIn={setIsLoggedIn} />
  }
  else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName="Stats"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                const rn = route.name;
    
                if (rn === "Get") {
                  iconName = focused ? "home" : "home-outline"
                } else if (rn === "Inventory") {
                  iconName = focused ? "cube" : "cube-outline"
                } else if (rn === "Stats") {
                  iconName = focused ? "stats-chart" : "stats-chart-outline"
                } else if (rn === "Play") {
                  iconName = focused ? "game-controller" : "game-controller-outline"
                }
    
                return <Ionicons name={iconName} size={size} color={color} />
              },
              
              tabBarActiveTintColor: '#2F2B04',

              tabBarInactiveTintColor: '#929062',

              tabBarStyle: {
                height: 60,
                padding: 10,
                backgroundColor: "#CDCD9A"
              },

              tabBarLabelStyle: {
                fontSize: 12,
                paddingBottom: 7,
                color: "black"
              },

              header: (props) => <Header {...props} />,
            })
            }
          >
            <Tabs.Screen name="Get" component={Mint} />
            <Tabs.Screen name="Inventory" component={Inventory} />
            <Tabs.Screen name="Stats" component={Stats} />
            <Tabs.Screen name="Play" component={Play} />
          </Tabs.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

}

export default App;
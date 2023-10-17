import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import PermissionScreen from "./src/screens/PermissionScreen";

import { COLORS } from "./src/constants/index";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator initialRouteName="Permission">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Permission"
            component={PermissionScreen}
            options={{
              headerTitle: "Welcome",
              headerStyle: { backgroundColor: COLORS.blue },
              // headerShadowVisible: false,
              // headerShown: false,
              headerTitleStyle: {
                color: COLORS.white,
              }
            }}
          />

          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10vw",
  },
});

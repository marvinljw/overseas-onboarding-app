import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Pressable, Linking } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import PermissionScreen from "./src/screens/PermissionScreen";
import ScanPassportScreen from "./src/screens/ScanPassportScreen";

import { COLORS } from "./src/constants/index";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer styles={styles.container}>
        <Stack.Navigator initialRouteName="ScanPassport">
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

          <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
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

          <Stack.Screen
            name="ScanPassport"
            component={ScanPassportScreen}
            options={{
              headerTitle: "Scan your passport",
              headerStyle: { backgroundColor: COLORS.blue },
              headerTitleStyle: {
                color: COLORS.white,
              },
              headerRight: (prop) => (
                <Pressable
                  android_ripple={{
                    color: '#666666',
                    foreground: true,
                    borderless: true,
                  }}
                  onPress={() => {    
                    Linking.openURL("https://www.mom.gov.sg/eservices/sgworkpass");
                  }}>
                  <Icon
                    style={{paddingRight: 10}}
                    name="alert-circle-outline"
                    size={30}
                    color={"white"}
                  />
                </Pressable>
              )
            }}
          />
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
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Image } from 'react-native';
import { COLORS } from "../constants/index"

const SplashScreen = ( { navigation } ) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // OnMount, it will load for 5 seconds before moving to the next page
    // This will act as the retrieving data time frame
    useEffect(() => {
        console.log("use effect activated")

        const fetchData = async () => {
            await delay(3000);
            console.log("Waited 5s");
            navigation.push('Permission');
        }

        fetchData(); 
    }, [])

  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require("../assets/images/mom-logo.png")}
            resizeMode='contain'
        />
        <ActivityIndicator size="large" color={COLORS.blue}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "70%",
    height: "50%",
  },
});

export default SplashScreen;
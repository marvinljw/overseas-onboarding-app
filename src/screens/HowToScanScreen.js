import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const { width: windowWidth } = Dimensions.get("window");

const HowToScanScreen = ({navigation}) => {
  const handleGotItPress = () => {
    navigation.push('ScanPassport')
  };

  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/howtoscan.gif')} style={styles.images} />

        <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
          <Text style={styles.buttonText}>Got It!</Text>
      </TouchableOpacity>
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
  images: {
    width: windowWidth*1.5, 
    height: windowWidth*1.5,
    marginLeft: windowWidth/10,
    alignItems: "center",
    justifyContent: "center",
  },
  btmButton: {
    ...BUTTONS.btmButton
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    padding: SIZES.small,
    fontSize: SIZES.medium,
  }
});

export default HowToScanScreen;

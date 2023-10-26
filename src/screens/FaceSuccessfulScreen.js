import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const { width: windowWidth } = Dimensions.get("window");

const FaceSuccessfulScreen = ({navigation}) => {
  const handleGotItPress = () => {
    navigation.push('Home')
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Verification Passed!</Text>
        <Image source={require('../assets/images/success.gif')} style={styles.images} />

        <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
          <Text style={styles.buttonText}>Proceed</Text>
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
  text: {
    textAlign: "center",
    fontWeight: "bold",
    padding: SIZES.small,
    fontSize: SIZES.xLarge,
  },
  images: {
    width: windowWidth, 
    height: windowWidth,
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

export default FaceSuccessfulScreen;

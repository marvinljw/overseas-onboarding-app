import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const { width: windowWidth } = Dimensions.get("window");

const PassportFailedScreen = ({navigation}) => {
  const handleGotItPress = () => {
    navigation.push('PassportSuccessful')
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Verification Failed!</Text>
        <Image source={require('../assets/images/failed.gif')} style={styles.images} />
        <Text style={styles.text}>User has not been registered.</Text>

        <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
          <Text style={styles.buttonText}>Try Again</Text>
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

export default PassportFailedScreen;

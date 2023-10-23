import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const HowToScanScreen = ({navigation}) => {
  const handleGotItPress = () => {
    navigation.push('ScanPassport')
  };

  return (
    <View style={styles.container}>
        <Text>HowToScan gif</Text>

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

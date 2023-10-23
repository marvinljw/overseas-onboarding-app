import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const HomeScreen = ({navigation}) => {
  const handleGotItPress = () => {
    navigation.push('ScanPassport')
  };

  return (
    <View style={styles.container}>
        <Text>Home Screen</Text>

        <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
          <Text style={styles.buttonText}>Confirm</Text>
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

export default HomeScreen;

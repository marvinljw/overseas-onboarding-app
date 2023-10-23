import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";

const PermissionScreen = ({ navigation }) => {
  const handleLinkPress = () => {
    const url = "https://www.mom.gov.sg/eservices/sgworkpass";
    Linking.openURL(url);
  };

  const handleGotItPress = () => {
    navigation.push('Home')
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/permission-logo.jpeg")}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to SGWorkPass</Text>
      <Text style={styles.details}>
        The app needs your permission to access your{" "}
        <Text style={styles.boldText}>camera</Text>,{" "}
        <Text style={styles.boldText}>phone</Text> and{" "}
        <Text style={styles.boldText}>gallery</Text>. {"\n"}
        When prompted, please click 'Allow'.
      </Text>

      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.linkText}>More on SGWorkPass</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGotItPress} style={styles.btmButton}>
        <Text style={styles.buttonText}>Got It</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: "5%",
  },
  logo: {
    width: "70%",
    height: "35%",
  },
  title: {
    fontSize: SIZES.large,
    marginBottom: SIZES.medium,
    fontWeight: "bold",
  },
  details: {
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: SIZES.xxLarge,
    lineHeight: SIZES.xLarge,
  },
  boldText: {
    fontWeight: "bold",
  },
  linkText: {
    color: COLORS.blue,
    fontSize: SIZES.medium,
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

export default PermissionScreen;

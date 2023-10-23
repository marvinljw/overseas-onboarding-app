import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, BUTTONS } from "../constants/index";

const PurposeScreen = ({ navigation }) => {
  const [purpose, setPurpose] = useState("WP Form");

  const handlePressWP = () => {
    setPurpose("WP Form");
  };

  const handlePressOthers = () => {
    setPurpose("Others");
  };

  const handleConfirmPress = () => {
    if (purpose == "Others") {
        alert("This is out of scope of the project. Please select to apply for Work Permit instead.");
    } else {
        navigation.push('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tell us more about yourself.</Text>

      <TouchableOpacity
        style={styles.purposeBox(purpose, "WP Form")}
        onPress={handlePressWP}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/purpose-WP-form.jpeg")}
          resizeMode="contain"
        />
        <Text style={styles.details(purpose, "WP Form")}>I am here to apply for the Work Permit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.purposeBox(purpose, "Others")}
        onPress={handlePressOthers}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/purpose-others.jpeg")}
          resizeMode="contain"
        />
        <Text style={styles.details(purpose, "Others")}>I am a service provider, member of public or others</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleConfirmPress} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: "5%",
  },

  header: {
    fontSize: SIZES.medium,
    marginBottom: SIZES.medium,
    fontWeight: "600",
  },

  purposeBox: (selectedPurpose, purpose) => ({
    height: "36%",
    borderRadius: SIZES.xxSmall,
    borderColor: COLORS.blue,
    borderWidth: selectedPurpose == purpose ? 1.5 : 0,
    ...SHADOWS.medium,
    padding: SIZES.xxLarge,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.xLarge,
    opacity: selectedPurpose == purpose ? 1 : 0.7,
  }),

  logo: {
    width: "80%",
    height: "80%",
    marginBottom: SIZES.medium,
    marginTop: SIZES.small,
  },

  details: (selectedPurpose, purpose) => ({
    textAlign: "center",
    color: selectedPurpose == purpose ? COLORS.black : COLORS.grey,
    fontSize: SIZES.medium,
  }),

  button: {
    ...BUTTONS.btmButton,
  },

  buttonText: {
    ...BUTTONS.btmButtonText,
  }
});

export default PurposeScreen;

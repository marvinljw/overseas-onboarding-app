import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, SHADOWS, BUTTONS } from "../constants/index";

const SetupOverviewScreen = ({navigation}) => {
  const handlePress = () => {
    navigation.push("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          Getting Started:
        </Text>
        <Text style={styles.listItem}>1. This phone should belong to a Migrant Domestic Worker.</Text>
        <Text style={styles.listItem}>2. Prepare your passport for the Passport Verification.</Text>
        <Text style={styles.listItem}>3. It is illegal for anyone other than the Migrant Domestic Worker to consent the applciation</Text>
      </View>

      <View>
        <Text style={styles.title}>Progress Overview</Text>
        <View style={styles.progressBox}>
          <View style={styles.progressItem}>
            <Text style={styles.progressText}>1. Passport Verification</Text>
            <Image
              style={styles.logo}
              source={require("../assets/images/pending.png")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.progressText}>2. Face Verification</Text>
            <Image
              style={styles.logo}
              source={require("../assets/images/pending.png")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.progressText}>3. Review Application</Text>
            <Image
              style={styles.logo}
              source={require("../assets/images/pending.png")}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.coolGrey,
    padding: "5%",
  },

  detailsContainer: {
    marginBottom: SIZES.xxLarge,
  },

  listItem: {
    fontSize: SIZES.medium,
    marginBottom: SIZES.xxSmall,
    marginLeft: SIZES.small,
    // lineHeight: SIZES.xLarge,
  },
  title: {
    fontWeight: "600",
    marginBottom: SIZES.large,
    fontSize: SIZES.xLarge,
  },

  progressBox: {
    // backgroundColor: "red",
    borderColor: COLORS.grey,
    borderWidth: 1,
    // height: "30vh",
    padding: SIZES.large,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignContent: "center",
  },

  progressItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: SIZES.medium,
    // height: "25%",
  },

  progressText: {
    fontSize: SIZES.large,
    fontWeight: "600",
    // letterSpacing: 1,
  },

  logo: {
    width: SIZES.xxLarge,
    height: SIZES.xxLarge,
    color: COLORS.green,
    // marginBottom: SIZES.medium,
    // marginTop: SIZES.small,
  },

  button: {
    ...BUTTONS.btmButton,
  },

  buttonText: {
    ...BUTTONS.btmButtonText,
  },
});

export default SetupOverviewScreen;

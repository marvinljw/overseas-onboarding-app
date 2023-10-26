import { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Sa } from 'react-native';
import { COLORS, FONT, SIZES, BUTTONS } from "../constants/index";
import { Card } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';

const WelcomeBackScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.caption}>Accessed on: 24 Aug 2023, 09:23AM</Text>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.title}>Application Status</Card.Title>
          <Card.Divider />
          <Image source={require("../assets/images/failedIcon.png")} style={styles.logo} />
          <Text style={styles.cardheading} h1>
            Date
          </Text>
          <Text style={styles.carddesc}>24 Aug 2023, 09:23AM</Text>
          <Text style={styles.cardheading} h1>
            Issue
          </Text>
          <Text style={styles.carddesc}>Reported Issue: Incorrect Salary</Text>
          <Text style={styles.cardheading} h1>
            Status
          </Text>
          <Text style={styles.carddesc}>MOM Emailed EA</Text>
        </Card>
        <Card containerStyle={styles.cardPermit}>
          <Card.Title style={styles.title}>Work Permit</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0, width: 150 }}
            source={{
              uri:
                'https://randomuser.me/api/portraits/men/58.jpg',
            }}
          />
          <Text style={styles.cardheading} h1>
            Name
          </Text>
          <Text style={styles.carddesc}>ABCDEFG HI</Text>
          <Text style={styles.cardheading} h1>
            FIN
          </Text>
          <Text style={styles.carddesc}>G***678B</Text>
          <Text style={styles.cardheading} h1>
            Pass Expires On
          </Text>
          <Text style={styles.carddesc}>G***678B</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: SIZES.large,
    fontSize: SIZES.xLarge,
  },
  scrollview: {
    flexGrow: 1,
  },
  title: {
    textAlign: "left",
    fontSize: SIZES.large,
  },
  text: {
    textAlign: "left",
    fontWeight: "bold",
    padding: SIZES.small,
    fontSize: SIZES.xLarge,
  },
  logo: {
    width: "30%",
    height: "15%"
  },
  caption: {
    textAlign: "center",
    color: COLORS.grey,
    padding: SIZES.xSmall,
    fontSize: SIZES.small,
  },
  card: {
    marginTop: 15,
    borderRadius: 10,
    borderTopWidth: 5,
    borderColor: COLORS.red,
  },
  cardPermit: {
    marginTop: 15,
    borderRadius: 10,
    borderTopWidth: 5,
    borderColor: COLORS.blue,
  },
  cardheading: {
    paddingTop: SIZES.medium,
  },
  carddesc: {
    fontWeight: "bold",
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

export default WelcomeBackScreen;

import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import Button from "../components/Button";
import { validateEmail, validateName } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = ({ navigation, route }) => {
  const [firstName, onChangeFirstName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);

  const completeOnboarding = async () => {
    if (!isFirstNameValid || !isEmailValid) {
      return;
    }

    try {
      const profile = {
        firstName: firstName,
        email: email,
      };

      await AsyncStorage.setItem("profile", JSON.stringify(profile));
      await AsyncStorage.setItem("onboardingStatus", "completed");

      route.params.setIsOnboardingComplete(true);
    } catch (error) {
      console.error("Error saving data to AsyncStorage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/images/Logo.png")} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Let us get to know you</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            value={firstName}
            onChangeText={onChangeFirstName}
            placeholder={"First Name"}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button disabled={!isFirstNameValid || !isEmailValid} onPress={completeOnboarding}>
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    height: 150,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EDEFEE",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 15,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    marginTop: 48,
    paddingVertical: 10,
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  inputStyle: {
    borderColor: "#EDEFEE",
    backgroundColor: "white",
    height: 50,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderRadius: 9,
    width: "100%",
  },
  footer: {
    backgroundColor: "#EDEFEE",
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    paddingVertical: 30,
    paddingHorizontal: 80,
  },
});

export default Onboarding;

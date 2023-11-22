import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { Checkbox } from "react-native-paper";

export default function Profile({ navigation, route }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("profile");
        if (storedProfile !== null) {
          const profile = JSON.parse(storedProfile);
          setFirstName(profile.firstName || "");
          setEmail(profile.email || "");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage", error);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      route.params.setIsOnboardingComplete(false);
    } catch (error) {
      console.error("Error clearing AsyncStorage data", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal information</Text>
      <View style={styles.avatarSection}>
        <Avatar imageUri={imageUri} firstName={firstName} lastName={lastName} />
        <View style={styles.avatarSectionButtons}>
          <Button onPress={pickImage}>Change</Button>
          <Button variant="outline" onPress={() => setImageUri(null)}>
            Remove
          </Button>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />

        <Text style={styles.label}>Phone Number</Text>
        <MaskedTextInput
          mask="(999) 999-9999"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
      </View>
      <View style={styles.notifications}>
        <Text style={styles.title}>Email notifications</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={orderStatuses ? "checked" : "unchecked"}
            onPress={() => {
              setOrderStatuses(!orderStatuses);
            }}
          />
          <Text style={styles.label}>Order Statuses</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={passwordChanges ? "checked" : "unchecked"}
            onPress={() => {
              setPasswordChanges(!passwordChanges);
            }}
          />
          <Text style={styles.label}>Password Changes</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={specialOffers ? "checked" : "unchecked"}
            onPress={() => {
              setSpecialOffers(!specialOffers);
            }}
          />
          <Text style={styles.label}>Special Offers</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            color="#495E57"
            status={newsletter ? "checked" : "unchecked"}
            onPress={() => {
              setNewsletter(!newsletter);
            }}
          />
          <Text style={styles.label}>Newsletter</Text>
        </View>
      </View>
      <View style={styles.footerButtons}>
        <Button variant="action" onPress={handleLogout}>
          Log out
        </Button>

        <View style={styles.changeButtons}>
          <Button variant="outline" onPress={() => {}}>
            Discard changes
          </Button>
          <Button onPress={() => {}}>Save changes</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    // gap: 15,
  },
  title: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "bold",
  },
  avatarSection: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarSectionButtons: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    gap: 20,
  },
  form: {
    marginTop: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#495E57",
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#495E57",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  changeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 100,
  },
});

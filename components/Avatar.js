import { View, Text, Image, StyleSheet } from "react-native";

export default function Avatar({ imageUri, firstName, lastName }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  return (
    <View>
      <Text style={styles.subheading}>Avatar</Text>
      <View style={styles.avatar}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <Text style={{ fontSize: 40 }}>{getInitials(`${firstName} ${lastName}`)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  subheading: {
    fontSize: 12,
    marginBottom: 5,
    color: "#777",
  },
});

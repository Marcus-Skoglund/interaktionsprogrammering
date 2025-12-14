import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.rep_container}>
        <View>
          <Text style={styles.Text}>Title</Text>
        </View>
        <View>
          <Text style={styles.Text}>Link?</Text>
        </View>
        <View>
          <Text style={styles.Text}>Description</Text>
        </View>
        <View>
          <View>
            <Text style={styles.Text}>Forks</Text>
          </View>
          <View>
            <Text style={styles.Text_stars}>Stars</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: "#1e1c1cff",
    width: "100%",
    height: "100%",
  },
  rep_container: {
    backgroundColor: "#454545",
    width: "40%",
    maxHeight: 300,
  },
  Text: {
    color: "#fff",
  },
  Text_stars: {
    color: "#FFD700",
  },
});

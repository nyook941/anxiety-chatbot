import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { setDob, setGeneralInfo, setName } from "../../redux/slices/user-slice";

export default function UserInfo() {
  const dispatch = useDispatch();
  const { name, dob, generalInfo } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {}, []);

  const handleSave = () => {
    alert("Information updated successfully");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => dispatch(setName(text))}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={(text) => dispatch(setDob(text))}
        />
      </View>

      <View>
        <Text style={styles.generalInfo}>General Information</Text>
        <TextInput
          style={styles.textArea}
          value={generalInfo}
          onChangeText={setGeneralInfo}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    flex: 1,
    padding: 20,
    backgroundColor: "#3a2d2d",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    flex: 1,
    textAlign: "left",
    marginRight: 10,
    color: "white",
  },
  generalInfo: {
    fontSize: 18,
    flex: 1,
    textAlign: "left",
    marginVertical: 10,
    color: "white",
    marginBottom: 10,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "gray",
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#cc5500",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "convex/react";
import { api } from "./convex/_generated/api";

export default function Tasks() {
  const tasks = useQuery(api.tasks.get);
  return (
    <View style={styles.container}>
      {tasks?.map(({ _id, text }) => (
        <Text key={_id}>{text}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centers children vertically in the container
    alignItems: 'center', // centers children horizontally in the container
    backgroundColor: '#fff', // just an example background color
  }})

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
   
    const onSignInPress = async () => {
      if (!isLoaded) {
        return;
      }
   
      try {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
        // This is an important step,
        // This indicates the user is signed in
        await setActive({ session: completeSignIn.createdSessionId });
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
   
        <View>
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
   
        <TouchableOpacity onPress={onSignInPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }
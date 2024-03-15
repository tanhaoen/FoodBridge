import * as React from "react";
import { StyleSheet } from 'react-native';

import { Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#6c47ff',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	button: {
		margin: 8,
		alignItems: 'center'
	}
});
 
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
 
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  return (
    <View style={styles.container}>
    {!pendingVerification && (
        <View>
        <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name"
              onChangeText={(firstName) => setFirstName(firstName)}
              style={styles.inputField}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name"
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.inputField}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
              style={styles.inputField}
            />
          </View>
 
          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={styles.inputField}
            />
          </View>
 
          {/* <TouchableOpacity onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </TouchableOpacity> */}
          <Button
            title="Sign up"
            onPress={onSignUpPress}
            color={'#6c47ff'}
            style={styles.button}></Button>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
              style={styles.inputField}
            />
          </View>
          {/* <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity> */}
          <Button
            title="Verify Email"
            onPress={onPressVerify}
            color={'#6c47ff'}
            style={styles.button}></Button>
        </View>
      )}
    </View>
  );
}
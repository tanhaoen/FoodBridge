import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import * as React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { Avatar, Banner, Button, Icon, List, RadioButton, Text, TextInput, useTheme } from "react-native-paper";

//auth
import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import SignInScreen from "./auth/SignInScreen";

export default function Account() {
	//auth
	const { isSignedIn, user } = useUser();
	const { isLoaded, signOut} = useAuth();
	const SignOut = () => {

		if (!isLoaded) {
		  return null;
		}
		signOut();
		console.log("Signed Out");
	}

	
	const theme = useTheme();

	const paymentMapping = {
		"mastercard": require("../assets/mastercard.png"),
		"visa": require("../assets/visa.png"),
		"paypal": require("../assets/paypal.png")
	}

	const userData = useQuery(api.users.queryUsers, {
    username: 'jsmith2024',
  });

  const [tempUsername, setTempUsername] = React.useState(undefined);
  const [tempEmail, setTempEmail] = React.useState(undefined);

  React.useEffect(() => {
    if (userData) {
      setTempUsername(userData.username);
      setTempEmail(userData.email);
    }
  }, [userData]);

	const [selectedPayment, setSelectedPayment] = React.useState('mastercard');
	const [validEmail, setValidEmail] = React.useState(true);
	const [validUsername, setValidUsername] = React.useState(true);

	const updateAccount = useMutation(api.users.updateUser);
	const checkValidUsername = useQuery(api.users.checkValidUsername);

	const saveDetails = () => {
		if (validEmail && validUsername) {
			updateAccount({id: userData._id, username: tempUsername, email: tempEmail});
		}
	}

	const handleEmailChange = (email) => {
		setTempEmail(email);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(tempEmail)) {
			setValidEmail(true);
		} else {
			setValidEmail(false);
		}
	}

	const handleUsernameChange = (username) => {
		setTempUsername(username);

		if ((checkValidUsername({username: username}) || username === userData.username) && username !== '') {
			setValidUsername(true);
		} else {
			setValidUsername(false);
		}
	};

	const paymentMethods = [
		{label: 'Mastercard **** **** **** 1234', type: 'mastercard', value: 1},
		{label: 'Visa **** **** **** 5678', type: 'visa', value: 2},
		{label: 'PayPal', type: 'paypal', value: 3}
	];

	paymentMethods.forEach(method => {
		method.imageSource = paymentMapping[method.type];
	});

	const styles = StyleSheet.create({
		jumbotron: {
			flexDirection: 'row',
			alignItems: 'center',
			height: 120,
			backgroundColor: theme.colors.primary,
		},
		jumbotron_info_group: {
			flex: 8,
			marginLeft: 40,
		},
		jumbotron_avatar: {
			flex: 2,
			justifyContent: 'flex-end',
			marginRight: 80,
		},
		settings: {
			marginHorizontal: 10,
			backgroundColor: theme.colors.background,
		},
		accordion: {
			borderBottomWidth: 1,
			borderBottomColor: "#EEEEEE"
		},
		edit_profile_group: {
			marginHorizontal: 30,
		},
		edit_profile_input: {
			backgroundColor: theme.colors.light,
			borderColor: theme.colors.primary,
			borderRadius: 10,
			marginBottom: 10
		},
		payment_method_group: {
			flexDirection: 'row',
			alignItems: 'center',
			marginLeft: 25
		}
	})

	return (
		<View style={{backgroundColor: theme.colors.background, flex: 1}}>
			{userData !== undefined ? (
			<>
			<View style={styles.jumbotron}>
				<View style={styles.jumbotron_info_group}>
					<Text variant="headlineMedium" style={{color: 'white', fontWeight: 'bold'}}>{user.firstName} {user.lastName}</Text>
					<View style={{flexDirection: 'row'}}>
						<Text variant="titleMedium" style={{color: 'white', marginBottom: 7}}>@{userData.username}</Text>
						{userData.verified ? (
							<Icon source="check-decagram" color='blue' size={20} />
						) : null}
					</View>
					
					<Text variant="titleMedium" style={{color: 'white'}}>Level {userData.level} Foodie</Text>
				</View>
				<View style={styles.jumbotron_avatar}>
					<Avatar.Image source={require('../assets/avatar.png')} size={80} />
				</View>
			</View>
			<View style={styles.settings}>
				{/* <List.AccordionGroup>
					<List.Accordion title="Edit Profile" id="edit" style={styles.accordion}>
						<View style={styles.edit_profile_group}>
							<TextInput
								style={styles.edit_profile_input}
								mode="outlined"
								label="Username"
								value={tempUsername}
								onChangeText={handleUsernameChange}
								error={!validUsername}
							/>
							<TextInput
								style={styles.edit_profile_input}
								mode="outlined"
								label="Email"
								value={tempEmail}
								onChangeText={handleEmailChange}
								error={!validEmail}
							/>
							<Button
								mode="contained"
								icon="check"
								style={{marginHorizontal: 80, marginBottom: 10}}
								onPress={saveDetails}
							>
								Save Details
							</Button>
						</View>
					</List.Accordion>
					<List.Accordion title="Linked Payment Methods" id="payment" style={styles.accordion}>
						<View>
							<RadioButton.Group>
								{paymentMethods.map((method, index) => (
									<View style={styles.payment_method_group} key={index}>
										<Image
											source={method.imageSource}
											style={{width: 40, height: 30, objectFit: 'contain'}}
										/>
										<View style={{flex: 1}} key={index}>
											<RadioButton.Item
												key={index}
												label={method.label}
												value={method.value}
												status={selectedPayment === method.value ? 'checked' : 'unchecked'}
												onPress={() => setSelectedPayment(method.value)}
											/>
										</View>
									</View>
								))}
							</RadioButton.Group>
							<Button
								mode="contained"
								icon="plus"
								style={{marginHorizontal: 80, marginBottom: 20}}
							>
								Add Payment Method
							</Button>
						</View>
					</List.Accordion>
					<List.Accordion title="Transaction History" id="history" style={styles.accordion}>
							<List.Item title="Orders" />
							<List.Item title="Payments" />
					</List.Accordion>
					<List.Accordion title="Change Password" id="password" style={styles.accordion}>
					</List.Accordion>
					<List.Accordion title="Help" id="help">
							<List.Item title="FAQ" />
							<List.Item title="Contact Us" />
					</List.Accordion>
				</List.AccordionGroup> */}

				<Button
					onPress={() => SignOut()}
					mode='contained'
					buttonColor={theme.colors.error}
					style={{marginTop: 50}}
				>
					Logout
				</Button>
			</View>
			</>
			) : null}
		</View>
		
	);
}
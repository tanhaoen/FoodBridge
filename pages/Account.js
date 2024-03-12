import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Icon, List, RadioButton, Text, TextInput, useTheme } from "react-native-paper";

export default function Account() {
	
	const theme = useTheme();

	const [selectedPayment, setSelectedPayment] = React.useState('mastercard');

	const paymentMapping = {
		"mastercard": require("../assets/mastercard.png"),
		"visa": require("../assets/visa.png"),
		"paypal": require("../assets/paypal.png")
	}

	const paymentMethods = [
		{label: 'Mastercard **** **** **** 1234', type: 'mastercard', value: 1},
		{label: 'Visa **** **** **** 5678', type: 'visa', value: 2},
		{label: 'PayPal', type: 'paypal', value: 3}
	];

	paymentMethods.forEach(method => {
		method.imageSource = paymentMapping[method.type];
	});

	console.log(paymentMethods);

	return (
		<View style={{marginHorizontal: 10}}>
			<List.AccordionGroup>
				<List.Accordion title="Edit Profile" id="edit">
					<View style={{marginHorizontal: 30, marginVertical: 10}}>
						<TextInput label="Name" />
						<TextInput label="Email" />
					</View>
				</List.Accordion>
				<List.Accordion title="Linked Payment Methods" id="payment">
					<RadioButton.Group>
						{paymentMethods.map((method, index) => (
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<Image
									source={method.imageSource}
									style={{
										width: 40, height: 30, objectFit: 'contain'
									}} />
								<View style={{flex: 1}}>
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
				</List.Accordion>
				<List.Accordion title="Transaction History" id="history">
						<List.Item title="Orders" />
						<List.Item title="Payments" />
				</List.Accordion>
				<List.Accordion title="Change Password" id="password">
						<List.Item title="Password" />
						<List.Item title="PIN" />
				</List.Accordion>
				<List.Accordion title="Help" id="help">
						<List.Item title="FAQ" />
						<List.Item title="Contact Us" />
				</List.Accordion>
			</List.AccordionGroup>

			<Button mode='contained' buttonColor={theme.colors.error}>Logout</Button>
		</View>
	);
}
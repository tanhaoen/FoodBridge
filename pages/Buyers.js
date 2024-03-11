import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import BuyerCard from "../components/BuyerCard";

export default function Buyers() {

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
		setRefreshing(false);
		}, 2000);
	}, []);
  
	const sampleOrder = [
		{
			buyerName: "John Doe",
			eta: 5,
			distance: 500,
			item: "Curry Chicken",
			quantity: 3
		}
	]

	return (
		<View style={{ marginHorizontal: 16, marginTop: 30, flex: 1 }}>
			<Button
				icon="qrcode"
				mode="contained"
				onPress={() => console.log('Pressed')}
			>
				Scan buyer's QR code
			</Button>
			<ScrollView vertical style={{flex: 1}}>
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				{sampleOrder.map((order, index) => (
				<BuyerCard
					key={index}
					buyerName={order.buyerName}
					eta={order.eta}
					distance={order.distance}
					item={order.item}
					quantity={order.quantity}
				/>	
				))}
			</ScrollView>
		</View>
	);
}
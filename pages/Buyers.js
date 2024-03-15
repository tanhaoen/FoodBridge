import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { calculateDistance} from "../utils";

import React from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import BuyerCard from "../components/BuyerCard";
import { LocationContext } from "../components/LocationProvider";

export default function Buyers() {

	const { location, errorMsg } = React.useContext(LocationContext);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
		setRefreshing(false);
		}, 2000);
	}, []);

	const orderData = useQuery(api.orders.queryOrders, { user_id: "jh7dd7a3s178tyv4dzz2m1ebrd6nbsq7" });
	// const orderData = [];

	const results = React.useMemo(() => {
		if (orderData !== undefined) {
			let temp = orderData;

			console.log(orderData);

			if (location !== undefined) {
				temp = temp.map((item) => {
					item.distance = calculateDistance(location.coords.latitude, location.coords.longitude, item.listing_location.latitude, item.listing_location.longitude);
					return item;
				});
				return temp;
			}
		}
	}, [orderData, location]);

	return (
		<View style={{ marginHorizontal: 16, marginTop: 30, flex: 1 }}>
			{orderData !== undefined ? (
			<ScrollView vertical style={{ flex: 1 }}>
				{orderData.length > 0 ? (
				<>
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					{orderData.map((order, index) => (
					<BuyerCard
						key={index}
						buyerName={order.buyer_name}
						distance={order.distance}
						item={order.item}
						quantity={order.quantity}
					/>
					))}
				</>
				) : (
				<View style={{alignItems: 'center'}}>
					<Image source={require("../assets/basket.png")} />
					<Text>No orders found!</Text>
				</View>
				)}
			</ScrollView>
			) : (
			<ActivityIndicator />
			)}

		</View>
	);
}
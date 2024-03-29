import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import { calculateDistance} from "../utils";

import React from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Icon, List, Text, useTheme } from "react-native-paper";
import { LocationContext } from "../components/LocationProvider";

export default function Buyers() {

	const { location, errorMsg } = React.useContext(LocationContext);
	const [refreshing, setRefreshing] = React.useState(false);

	const theme = useTheme();

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
			if (location !== undefined) {
				temp = temp.map((item) => {
					item.distance = calculateDistance(item.buyer_location.latitude, item.buyer_location.longitude, item.listing_location.latitude, item.listing_location.longitude);
					item.eta = Math.floor((item.distance / 80) * 2);
					return item;
				});
				return temp;
			}
		}
	}, [orderData, location]);
	return (
		<View style={{ paddingHorizontal: 16, paddingTop: 30, flex: 1, backgroundColor: theme.colors.background }}>
			{results !== undefined ? (
			<ScrollView vertical style={{ flex: 1 }}>
				{results.length > 0 ? (
				<>
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					<List.Section>
						{results.map((order, index) => (
						<List.Item
							key={index}
							title={`${order.item} x ${order.quantity}`}
							titleStyle={{fontFamily: 'Poppins-Medium'}}
							description={order.buyer_name}
							descriptionStyle={{fontFamily: 'Poppins-Regular'}}
							left={props => <Text variant='headlineLarge' style={{color: theme.colors.secondary, fontFamily: 'Poppins-SemiBold'}}>{order.order_number}</Text>}
							right={props => <View><Text style={{fontFamily: 'Poppins-Regular'}}>{order.distance}m away</Text><Text>{order.eta} minutes away</Text></View>}
							style={{borderBottomWidth: 1, borderBottomColor: "#EEEEEE"}}
						/>
						))}
					</List.Section>
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
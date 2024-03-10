import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import BuyerCard from "../components/BuyerCard";

export default function Buyers() {
  
	const sampleOrder = [
		{
			item: "Curry Chicken",
			quantity: 3
		}
	]

	return (
		<View style={{ marginHorizontal: 16, marginTop: 30 }}>
			<Button
				icon="qrcode"
				mode="contained"
				onPress={() => console.log('Pressed')}
			>
				Scan buyer's QR code
			</Button>
			<ScrollView vertical>
				<BuyerCard
					buyerName="John Doe"
					eta={5}
					distance="500"
					order={sampleOrder}
				/>
			</ScrollView>
		</View>
	);
}
import { Text } from "react-native-paper";
import ListingCard from "../components/ListingCard";

export default function Home() {

  return (
      <>
      <ListingCard
      title = "Nasi Lemak Bungkus"
      provider = "Jamie Lee"
      price = "10.00"
      quantity = "10"
      availableUntil = "5.30pm"
      distance = "400m"
      thumbnail = "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1638/https://woonheng.com/wp-content/uploads/2021/05/Nasi-Lemak-Bungkus-2-1638x2048.jpg"
      />
      <ListingCard
      title = "Briyani"
      provider = "Jamie Lee"
      price = "10.00"
      quantity = "10"
      availableUntil = "5.30pm"
      distance = "400m"
      thumbnail = "https://www.ajinomotofoodbizpartner.com.my/wp-content/uploads/2023/11/Briyani-Ricemobile-02-jpg.webp"
      />
      </>
  );
}
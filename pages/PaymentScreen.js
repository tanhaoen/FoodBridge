import { CardField, useStripe } from '@stripe/stripe-react-native';

export function PaymentScreen() {
  // ...
  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
      />
    </View>
  );
}

//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { CardField, useStripe,createToken,confirmPayment,useConfirmPayment } from '@stripe/stripe-react-native';
// create a component
const Payment = ({navigation}) => {

    // const { createPaymentMethod, handleNextAction } = useStripe();
    // const {confirmPayment, loading} = useConfirmPayment();
// const { confirmPayment } = useStripe();
const [cardInfo,setCardInfo] = useState(null);
let pay = "pi_3NZYe7SFtXus5FS00LeZoDiT_secret_ETR3OQlpszZRC1gSpWHyc7qpY"


const fetchCardDetails = (cardDetails) =>{

    console.log("card details",cardDetails.complete)
if(cardDetails.complete){
    setCardInfo(cardDetails)
}else{
    setCardInfo(null)
}
}

// console.log("data of cardinfo",cardInfo)


const onDone = async() =>{
   
   
    const billingDetails = {
      email: 'email@stripe.com',
      phone: '+48888000888',
      addressCity: 'Houston',
      addressCountry: 'US',
      addressLine1: '1459  Circle Drive',
      addressLine2: 'Texas',
      addressPostalCode: '77063',
    };

    const booking = await confirmPayment(pay,{
      
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      }
    });

    console.log("booking data",booking)
}


const paym = async() => {
    // ...
  
    // If PaymentIntent requires action, call handleNextAction
    if (payment_intent_client_secret && requires_action) {
      const { error, paymentIntent } = await handleNextAction(payment_intent_client_secret);
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (paymentIntent) {
          if (
            paymentIntent.status === PaymentIntents.Status.RequiresConfirmation
          ) {
            // Confirm the PaymentIntent again on your server
            const response = await fetch(`/pay`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
            });
            const { error, success } = await response.json();
            if (error) {
              // Error during confirming Intent
              Alert.alert('Error', error);
            } else if (success) {
              Alert.alert('Success', 'The payment was confirmed successfully!');
            }
          } else {
            // Payment succedeed
            Alert.alert('Success', 'The payment was confirmed successfully!');
          }
        }
    }
  };
  
  // ...

    return (

        <View style={{flex:1}}>
        <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
            fetchCardDetails(cardDetails)
        //   console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
<TouchableOpacity onPress={onDone} style={{borderRadius:12,backgroundColor:'orange',padding:20,margin:20,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:18,color:'white',fontWeight:'700'}}>Book now</Text>
</TouchableOpacity>

</View>
      
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Payment;

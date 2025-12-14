import { registerRootComponent } from 'expo';
import { StyleSheet, View, Animated } from 'react-native';
import React, { useState, useRef } from "react";
import { cardBackgrounds } from '../util/card_image';
//import { cardInformation } from '../util/card_info';
// expo-router/entry
// Import the new components
import CreditCard from '../components/creditcard';
import CardForm from '../components/card_form';

const Home = () => {
    // 1. STATE
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("MM");
    const [selectedYear, setSelectedYear] = useState("YY");
    const [cvc, setCVC] = useState("");
    const [cardType, setCardType] = useState("Visa");
    const currentYear = new Date().getFullYear();
    const [number_length, setCardMaxLength] = useState(19); // 16 digits + 3 spaces = 19
    const [CVC_length, setCVCMaxLength] = useState(3);

    // Random Image
    const [cardImage] = useState(() => {
        const randomIndex = Math.floor(Math.random() * cardBackgrounds.length);
        return cardBackgrounds[randomIndex];
    });

    // Animation Ref
    const flipAni = useRef(new Animated.Value(0)).current;

    // 2. HELPER FUNCTIONS
    const getCardType = (number) => {
        if (number.match(/^(34|37)/) != null) return "Amex";
        if (number.match(/^5[1-5]/) != null) return "Mastercard";
        if (number.match(/^6011/) != null) return "Discover";
        if (number.match(/^9792/) != null) return "Troy";
        if (number.match(/^62/) != null) return "Unionpay";
        if (number.match(/^(30[0-5]|36|38)/) != null) return "Dinersclub";
        if (number.match(/^35(2[8-9]|[3-8][0-9])/) != null) return "JCB";
        return "Visa";
    };

    const handleCardNumberChange = (text) => {
        const cleaned = text.replace(/\D/g, '');
        const card_type = getCardType(cleaned);
        setCardType(card_type);

        let formatted = cleaned;

        if (card_type === "Amex") {
            // Total max length for the input field (15 digits + 2 spaces)
            setCardMaxLength(17); // 15 digits + 2 spaces
            setCVCMaxLength(4);   // 4 digits for Amex CVC
            // Amex pattern: xxxx xxxxxx xxxxx (Groups of 4, 6, and 5)
            // This single regex handles incremental spacing as the user types.
            formatted = cleaned.replace(/(\d{4})(\d{1,6})?(\d{1,5})?/, (match, p1, p2, p3) => {
                let result = p1; // Start with the first 4 digits

                if (p2) {
                    // If the 5th digit (start of 2nd group) exists, add a space
                    result += ' ' + p2;
                }
                if (p3) {
                    // If the 11th digit (start of 3rd group) exists, add a space
                    result += ' ' + p3;
                }

                return result;
            });
        }
        else {
            formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
        }

        setCardNumber(formatted);
    };

    const flipToBack = () => {
        Animated.timing(flipAni, { toValue: 1, duration: 350, useNativeDriver: true }).start();
    };

    const flipToFront = () => {
        Animated.timing(flipAni, { toValue: 0, duration: 350, useNativeDriver: true }).start();
    };

    // 3. RENDER
    return (
        <View style={styles.container}>

            <CreditCard
                cardNumber={cardNumber}
                cardName={cardName}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                cvc={cvc}
                cardType={cardType}
                cardImage={cardImage}
                flipAni={flipAni}
            />

            <CardForm
                number_length={number_length}
                CVC_length={CVC_length}
                cardNumber={cardNumber}
                setCardNumber={handleCardNumberChange}
                setCardName={setCardName}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                setCVC={setCVC}
                flipToFront={flipToFront}
                flipToBack={flipToBack}
                currentYear={currentYear}
            />

        </View>
    );
}

registerRootComponent(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D6EAF8",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
});
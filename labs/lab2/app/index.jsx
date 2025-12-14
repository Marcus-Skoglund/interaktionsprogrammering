import { StyleSheet, Text, View, TextInput, Image, Button, Animated, } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import React, { useState, useRef } from "react";
import { cardBackgrounds } from '../util/card_image';
import { cardInformation } from '../util/card_info';
import { logoRatios } from '../util/logo_ratio';

const Home = () => {
    // Create states to hold the input values
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("MM");
    const [selectedYear, setSelectedYear] = useState("YY");
    const [cvc, setCVC] = useState("");
    const [cardType, setCardType] = useState("Visa");
    const currentYear = new Date().getFullYear();

    // Pick correct logo
    const getCardType = (number) => {
        //if (number.match(/^4/) != null) return cardInformation.Visa;
        if (number.match(/^(34|37)/) != null) return "Amex";
        if (number.match(/^5[1-5]/) != null) return "Mastercard";
        if (number.match(/^6011/) != null) return "Discover";
        if (number.match(/^9792/) != null) return "Troy";
        if (number.match(/^62/) != null) return "Unionpay";
        if (number.match(/^(30[0-5]|36|38)/) != null) return "Dinersclub";
        if (number.match(/^35(2[8-9]|[3-8][0-9])/) != null) return "JCB";

        return "Visa"; // default
    };

    const formatCardNumber = (text) => {
        // Remove all non-digits (spaces, dots, etc.)
        const cleaned = text.replace(/\D/g, '');

        // Insert a space after every 4 digits
        // (\d{4})  -> Capture group of 4 digits
        // (?=\d)   -> Lookahead: Only add space if there is a digit following
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Update the state
        setCardNumber(formatted);
        // Update the logo
        setCardType(getCardType(cleaned));
    };

    // Function to pick a random image
    const [cardImage] = useState(() => {
        const randomIndex = Math.floor(Math.random() * cardBackgrounds.length);
        return cardBackgrounds[randomIndex];
    });

    const flipAni = useRef(new Animated.Value(0)).current;

    // INTERPOLATION (Mapping 0-180 to degrees)
    let frontInterpolate = flipAni.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    let backInterpolate = flipAni.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
    });

    // 3. FUNCTIONS TO TRIGGER FLIP
    const flipToBack = () => {
        Animated.timing(flipAni, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    const flipToFront = () => {
        Animated.timing(flipAni, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    // Style helper for animation
    const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
    const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer} >

                    {/* --- FRONT SIDE --- */}
                    <Animated.View style={[styles.cardFace, styles.frontFace, frontAnimatedStyle]}>
                        <Image source={cardImage} style={styles.image} />
                        {/* Darkening layer */}
                        <View style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.3)", }}>
                            {/* chip and logo */}
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/chip.png')} style={styles.image_chip} />
                                <Image source={cardInformation[cardType]} style={[styles.image_logo, { aspectRatio: logoRatios[cardType] }]} />
                            </View>
                            {/* Text overlay on image */}
                            <View style={styles.cardOverlay}>
                                <View style={{ width: '100%' }}>
                                    {/* Card Number Display */}
                                    <Text style={styles.overlayNumber}>
                                        {cardNumber || "#### #### #### ####"}
                                    </Text>
                                </View>
                                {/* Name and Date */}
                                <View style={styles.overlayNameDate}>
                                    <View>
                                        <Text style={styles.overlayLabel}>Card Holder</Text>
                                        <Text style={styles.overlayName}>
                                            {cardName.toUpperCase() || "AD SOYAD"}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.overlayLabel}>Expires</Text>
                                        <Text style={styles.overlayDate}>
                                            {selectedMonth}/{selectedYear.toString().slice(-2)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* --- BACK SIDE --- */}
                    <Animated.View style={[styles.cardFace, styles.backFace, backAnimatedStyle]}>
                        <Image source={cardImage} style={styles.image} />
                        {/* Darkening Layer */}
                        <View style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.3)", }} />

                        {/* Back Specific Design */}
                        <View style={styles.backContent}>
                            {/* Black Magnetic Strip */}
                            <View style={styles.blackStrip} />

                            {/* CVC */}
                            <View style={styles.cvcRow}>
                                <Text style={styles.cvcLabel}>CVV</Text>
                                <View style={styles.cvcWhiteBox}>
                                    <Text style={styles.cvcText}>{cvc}</Text>
                                </View>
                            </View>
                            {/* Logo backside */}
                            <Image source={cardInformation[cardType]} style={[styles.image_logo_back, { aspectRatio: logoRatios[cardType] }]} />
                        </View>
                    </Animated.View>
                </View>
            </View>

            {/* White box under card */}
            <View style={styles.infoContainer}>
                <View>
                    <Text>Card Number</Text>
                    <TextInput onFocus={flipToFront} value={cardNumber} onChangeText={(text) => formatCardNumber(text)} style={styles.textField} keyboardType="numeric" maxLength={19} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Card Holder</Text>
                    <TextInput onFocus={flipToFront} onChangeText={(text) => setCardName(text)} style={styles.textField} maxLength={26} />
                </View>
                <View style={styles.bottomRow}>
                    <View>
                        <Text>Expiration Date</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                onFocus={flipToFront}
                                selectedValue={selectedMonth}
                                onValueChange={(value, index) => { if (index === 0) return; setSelectedMonth(value); }}
                                style={styles.picker}
                            >
                                <Picker.Item label="Month" value={null} />
                                {[...Array(12)].map((_, i) => {
                                    const month = 1 + i;
                                    return <Picker.Item key={month} label={`${month}`} value={month} />
                                })}
                            </Picker>
                            <Picker
                                onFocus={flipToFront}
                                selectedValue={selectedYear}
                                onValueChange={(value, index) => { if (index === 0) return; setSelectedYear(value); }}
                                style={[styles.picker, { marginLeft: 15 }]}
                            >
                                <Picker.Item label="Year" value={null} />
                                {[...Array(12)].map((_, i) => {
                                    const year = currentYear + i;
                                    return <Picker.Item key={year} label={`${year}`} value={year} />
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Text>CVC</Text>
                        <TextInput onFocus={flipToBack} onBlur={flipToFront} onChangeText={(text) => setCVC(text)} style={styles.textFieldCVC} keyboardType="numeric" maxLength={3} />
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Submit"
                        color="#070be8ff"
                    />
                </View>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D6EAF8",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    // ----- White space under card -----
    infoContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -110,
        paddingTop: 160,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    bottomRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flexWrap: 'wrap',
    },
    textField: {
        marginTop: 5,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
    },
    textFieldCVC: {
        marginTop: 5,
        keyboardType: "numeric",
        maxLength: 3,
        width: 100,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },

    // ----- Dropdownmeny -----
    pickerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        backgroundColor: "#fff",
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: '#000000ff',
        borderRadius: 5,
    },

    // ----- Submit button -----
    button: {
        marginTop: 30,
        height: 50,
    },

    // ----- Card text -----
    cardOverlay: {
        position: 'absolute', // Floats on top of image
        padding: 25,
        width: '100%',
        justifyContent: 'space-between',
    },
    overlayNumber: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 60,
        letterSpacing: 3,
        fontFamily: 'monospace',
    },
    overlayNameDate: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    overlayLabel: {
        color: '#ccc',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    overlayName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    overlayDate: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // ----- Card shared style -----
    cardContainer: {
        zIndex: 10, // Renders on top of the form
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 340,
        height: 220,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    cardFace: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        backfaceVisibility: 'hidden', // hides the "back" of the image
    },
    frontFace: {
        position: 'absolute',
        zIndex: 1,
    },
    backFace: {
        position: 'absolute', // Sits directly "behind" the front
        zIndex: 0,
    },

    // ----- Card frontside style -----
    logoContainer: {
        padding: 20,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image_logo: {
        height: 30,
        width: "auto",
    },
    image_chip: {
        height: 40,
        width: "auto",
        aspectRatio: 101 / 82,
    },

    // ----- Card backside style -----
    backContent: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        heigth: '100%',
        zIndex: 10, // Makes backcontent to be above the darkening layer
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    blackStrip: {
        width: '100%',
        height: 40,
        backgroundColor: '#000000ff',
        marginTop: 10,
    },
    cvcRow: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    cvcLabel: {
        color: '#fff',
        fontSize: 10,
        textAlign: 'right',
        marginBottom: 5,
        marginRight: 5,
    },
    cvcWhiteBox: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    cvcText: {
        color: '#000',
        fontSize: 16,
    },
    image_logo_back: {
        height: 30,
        width: "auto",
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 20,
        opacity: 0.8,
    },
})




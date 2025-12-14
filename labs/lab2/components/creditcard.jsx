import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { cardInformation } from '../util/card_info';
import { logoRatios } from '../util/logo_ratio';

const CreditCard = ({
    cardNumber,
    cardName,
    selectedMonth,
    selectedYear,
    cvc,
    cardType,
    cardImage,
    flipAni
}) => {

    // INTERPOLATION LOGIC
    const frontInterpolate = flipAni.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAni.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
    });

    const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
    const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                {/* --- FRONT SIDE --- */}
                <Animated.View style={[styles.cardFace, styles.frontFace, frontAnimatedStyle]}>
                    <Image source={cardImage} style={styles.image} />
                    {/* Darkening layer */}
                    <View style={styles.darkOverlay}>
                        {/* chip and logo */}
                        <View style={styles.logoContainer}>
                            <Image source={require('../assets/chip.png')} style={styles.image_chip} />
                            <Image source={cardInformation[cardType]} style={[styles.image_logo, { aspectRatio: logoRatios[cardType] }]} />
                        </View>
                        {/* Text overlay on image */}
                        <View style={styles.cardOverlay}>
                            {/* Card Number Display */}
                            <View style={{ width: '100%' }}>
                                <Text style={styles.overlayNumber}>{cardNumber || "#### #### #### ####"}</Text>
                            </View>
                            {/* Name and Date */}
                            <View style={styles.overlayNameDate}>
                                <View>
                                    <Text style={styles.overlayLabel}>Card Holder</Text>
                                    <Text style={styles.overlayName}>{cardName.toUpperCase() || "AD SOYAD"}</Text>
                                </View>
                                <View>
                                    <Text style={styles.overlayLabel}>Expires</Text>
                                    <Text style={styles.overlayDate}>{selectedMonth}/{selectedYear.toString().slice(-2)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* --- BACK SIDE --- */}
                <Animated.View style={[styles.cardFace, styles.backFace, backAnimatedStyle]}>
                    <Image source={cardImage} style={styles.image} />
                    {/* Darkening Layer */}
                    <View style={styles.darkOverlay} />
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
    );
};

export default CreditCard;

const styles = StyleSheet.create({
    cardContainer: {
        zIndex: 10,
        alignItems: 'center', // Center the card
        marginTop: 20,
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
        backfaceVisibility: 'hidden',
    },
    frontFace: {
        position: 'absolute',
        zIndex: 1,
    },
    backFace: {
        position: 'absolute',
        zIndex: 0,
    },
    darkOverlay: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    // ... Copy all other Card-specific styles here (logoContainer, overlayNumber, blackStrip, etc.)
    logoContainer: {
        padding: 20,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image_logo: {
        height: 30,
        width: "auto",
        maxWidth: 90,
        resizeMode: "contain",
    },
    image_chip: {
        height: 40,
        width: "auto",
        aspectRatio: 101 / 82,
    },
    cardOverlay: {
        position: 'absolute',
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
        maxWidth: 240,
    },
    overlayDate: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    backContent: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    blackStrip: {
        width: '100%',
        height: 40,
        backgroundColor: '#000',
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
});
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ContactSellerForm from '../components/ContactSellerForm';

function ListingDetailsScreen({route}) {
    const listing = route.params;

    return (
        <ScrollView>
            <Image 
                style={styles.image}
                tint='light'
                preview={{uri:listing.images[0].thumbnailUrl}} 
                uri={listing.images[0].url}
            />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require('../assets/mosh.jpg')}
                        title='Mosh Hamedani'
                        subTitle='5 Listings' 
                    />
                </View>
                <ContactSellerForm listing={listing} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300,
    },
    detailsContainer:{
        padding:20,
    },
    userContainer:{
        marginVertical:30,
    },
    title:{
        fontSize:24,
        fontWeight:'500',
        color:colors.black,
        marginVertical:10,
    },
    price:{
        color:colors.secondary
    }
})

export default ListingDetailsScreen;
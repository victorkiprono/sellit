import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import Icon from '../components/Icon';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import ListItemSeparatorComponent from '../components/ListItemSeparator'
import useAuth from '../auth/useAuth';

const menuItems = [
    {
        title:'My Listings',
        icon:{
            name:'format-list-bulleted',
            backgroundColor:colors.primary
        },
        targetScreeen : 'Listings'
    },
    {
        title:'My Messages',
        icon:{
            name:'email',
            backgroundColor:colors.secondary
        },
        targetScreeen : 'Messages'
    }
];

function AccountScreen({navigation}) {
    const {user,logOut} = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.displayName}
                    subTitle={user.email}
                    image={require('../assets/mosh.jpg')}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparatorComponent}
                    renderItem = {({item})=>
                        <ListItem
                            title={item.title}
                            IconComponent ={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                            onPress={()=> navigation.navigate(item.targetScreeen)}
                        />              
                }
                />
            </View>
            <ListItem
                 title='Log Out'
                 IconComponent={
                     <Icon name='logout' backgroundColor='#ffe66d'/>
                 }
                 onPress={logOut}
            />
        </Screen>
    );
} 

const styles = StyleSheet.create({
    container:{
        marginVertical:20,
    },
    screen:{
        marginVertical:20,
    },
})

export default AccountScreen;
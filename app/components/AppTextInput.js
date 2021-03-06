import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons';

import defaultSyles from '../config/styles';

function AppTextInput({icon,width='100%',...otherProps}) {
    return (
        <View style={[styles.container,{width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultSyles.colors.medium} style={styles.icon}/>}
            <TextInput
                placeholderTextColor={defaultSyles.colors.medium} 
                style={defaultSyles.text}{...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:defaultSyles.colors.light,
        borderRadius:25,
        flexDirection:'row',
        padding:15,
        marginVertical:10,
    },

    icon:{
        marginRight:10,
    }
})

export default AppTextInput;
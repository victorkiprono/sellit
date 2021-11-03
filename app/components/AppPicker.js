import React, { useState } from 'react';
import { 
    TextInput, 
    View, 
    StyleSheet,
    TouchableWithoutFeedback, 
    Modal, 
    Button, 
    FlatList } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';
import Screen from './Screen';
import PickerItem from './PickerItem';

function AppPicker({
    icon,
    items,
    onSelectItem,
    numberOfColumns,
    placeholder,
    PickerItemComponent = PickerItem,
    selectedItem,
    width='100%'}) {

    const [modalVisible,setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>
                <View style={[styles.container,{width}]}>
                    {icon && 
                        <MaterialCommunityIcons 
                            name={icon} 
                            size={20} 
                            color={defaultStyles.colors.medium} 
                            style={styles.icon}
                        />
                    }
                    <TextInput style={defaultStyles.text} />
                    {selectedItem ? (
                        <AppText style={styles.text}>{selectedItem.label}</AppText>
                        ):(
                        <AppText style={styles.placeholder}>{placeholder}</AppText>)}

                    <MaterialCommunityIcons 
                        name='chevron-down' 
                        size={20} 
                        color={defaultStyles.colors.medium} 
                            
                    />
                </View>
    
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
                <Screen>
                    <Button title='close' onPress={()=>setModalVisible(false)}/>
                    <FlatList
                        data={items}
                        keyExtractor={item =>item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({item})=>
                            <PickerItemComponent
                                item={item}
                                label={item.label}
                                onPress={()=>{
                                    setModalVisible(false);
                                    onSelectItem(item);
                                }}
                            />
                    }
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:defaultStyles.colors.light,
        borderRadius:25,
        flexDirection:'row',
        padding:15,
        marginVertical:10,
    },
    text:{
        flex:1,
    },

    icon:{
        marginRight:10,
    },
    placeholder:{
        color:defaultStyles.colors.medium,
        flex:1,
    },
})

export default AppPicker;
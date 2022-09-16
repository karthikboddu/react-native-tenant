import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import commonStyles from '../../screens/styles';
import { IconToggle } from '../../utils';

const AddEditNotes = ({ addEditNoteModal, submitAddEditNote, onChangeInput, closeAddEditBookNote }) => {


    const inputFieldValidation = addEditNoteModal?.data?.title ? "#6d6d6d" : "rgb(255,55,95)";
    const drawerIconStyles = {icon: {transform: [{ rotate: '90deg'}]}};

    return (
        <View>
            {addEditNoteModal.visible && (
            <ScrollView style={styles.ParentView}>
                    <View style={styles.headerBarContainer}>
                        <View>
                            <IconToggle 
                                name={'close'}
                                size={32}
                                set={'ionicons'}
                                styles={drawerIconStyles}
                                color={'#2d2d2d'}
                                onPress={() => closeAddEditBookNote()} 
                            />
                        </View>
                        <View style={commonStyles.row}>
                            <View>
                                <IconToggle 
                                    name={'bookmark'}
                                    size={24}
                                    set={'feather'}
                                    color={'#2d2d2d'}
                                    onPress={() => submitAddEditNote()}
                                />
                            </View>
                            <View style={commonStyles.hSpace3} />
                        </View>
                    </View>
                <View>
                    <TextInput
                        style={styles.title}
                        placeholder="ADD TITLE ..."
                        value = {addEditNoteModal.data.title}
                        onChangeText={(value) => onChangeInput(value, 'title')}
                    />
                    <TextInput
                        style={styles.description}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="ADD DESCRIPTION ..."
                        value = {addEditNoteModal.data.description}
                        onChangeText={(value) => onChangeInput(value, 'description')}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
            
            )} 
        </View>
    )
}

export default AddEditNotes

const styles = StyleSheet.create({
    ParentView: {
    },
    title: {
        fontSize: 20,
        textAlignVertical: 'top',
        textAlign : 'justify',
        paddingLeft : 15
    },
    description: {
        fontSize: 20,
        textAlignVertical: 'top',
        textAlign : 'justify',
        paddingLeft : 15
    },
    picker: {
        height: 50,
        width: 200,
        top: 10,
        borderWidth: 1,
        width: '100%'
    },
    headerTitle: {
        textAlign: 'center',
        backgroundColor: 'red',
        flexGrow: 1,
        alignSelf: 'center',
    },
    dottedMenuContainer : {
        justifyContent : 'flex-end'
    },
    headerBarContainer: {
        paddingHorizontal:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },

})
import moment from 'moment';
import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

const NotesCard = ({navigation,item}) => {

    const handleNavigation = (item) => {
        console.log(item,"item")
        navigation.navigate('EditNotes', item)
    }



    return (
        <TouchableOpacity
            style={styles.parentView}
            onPress={() => handleNavigation(item)}
        >

            <View style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#FF92A9'
            }}>
                <Text style={styles.date}>
                    {moment(item.createdAt).format('DD MMMM')}
                </Text>
                <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                </Text>
                {/* <Text numberOfLines={1} style={styles.category}>
                            {this.props.item.category_name}
                        </Text> */}
                <Text numberOfLines={5} style={styles.note}>
                    {item.description}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default NotesCard

const styles = StyleSheet.create({
    parentView: {
        borderRadius: 10,
        margin: 13,
        flex: 1,
    },
    date: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    title: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
    },
    category: {
        fontSize: 15,
        color: 'white',
    },
    note: {
        color: 'white',
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
    }

})
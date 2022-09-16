import React from 'react';
import {
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import EmptyState from '../EmptyState';
import BookItem from './Note';


const ListNotes = ({ loading, fetchNotesListCall, handleActionMenuList, books=[] }) => {
    const renderItem = ({item, index}) => {
        return (
            <BookItem 
                item={item}
                handleActionMenuList={handleActionMenuList} 
            />
        );
    }


    const booksListKeyExtractor = (item, index) => {
        return (item && item._id) ? item._id : index+'';
    }

    return (
        <View style={styles.containerWrap}>
            <FlatList 
                data={books}
                numColumns={2}
                ListEmptyComponent={EmptyState}
                renderItem={renderItem}
                keyExtractor={booksListKeyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerWrap}
                onRefresh={fetchNotesListCall}
                refreshing={loading}
            />
        </View>
    );
}

export default ListNotes;

const styles = StyleSheet.create({
    containerWrap: {
        flex:1,
        flexGrow:1
    },
    contentContainerWrap: {
 
        backgroundColor:'transparent', 
        marginHorizontal:12
    }
});



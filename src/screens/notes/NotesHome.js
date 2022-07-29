import React, { useContext, useEffect } from 'react';
import {
    FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import NotesCard from '../../components/notes/NotesCard';
import { GlobalContext } from '../../context/GlobalState';

const NotesHome = ({navigation}) => {

    const {getTodoTasks, allTasksList} = useContext(GlobalContext);

    useEffect(() => {
        getTodoTasks();
    },[])

	const handleNavigation = () => {
		navigation.navigate('AddNotes')
	}

  return (
            <View style={styles.parentView}>
				<StatusBar backgroundColor="white" barStyle="dark-content" />
				<TextInput 
					style={styles.search}
					placeholder="search..."
				/>
				<FlatList 
					style={styles.flatList}
					data={allTasksList}
					numColumns={2}
					keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
					renderItem={({item}) => {
						return(
							<NotesCard item={item} navigation={navigation} />
						)
					}}
				/>
				<TouchableOpacity 
					style={styles.actionButton}
                    onPress={() => handleNavigation()}
				>
					<Text style={styles.actionButtonLogo}>+</Text>
				</TouchableOpacity>
			</View>
  )
}

export default NotesHome

const styles = StyleSheet.create({
	parentView: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		position: 'relative'
	},
	search: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 30,
		backgroundColor: 'white',
		elevation: 4,
		borderRadius: 50,
		paddingHorizontal: 25,
		fontSize: 20,
	},
	flatList: {
		paddingHorizontal: 10,
		marginTop: 20,
	},
	actionButton: {
		width: 70,
		height: 70,
		backgroundColor: 'white',
		borderRadius: 100, 
		position: 'absolute',
		elevation: 10,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		right: 30
	},
	actionButtonLogo: {
		fontSize: 30,
		fontWeight:'bold'
	},
	isLoading: {
		marginTop: 100,
	},
	isError: {
		alignSelf: 'center',
		fontSize: 20,
		marginTop: 100,
	}

})
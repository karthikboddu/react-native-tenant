import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
const AddNotes = () => {

  const categoryList =  [
    {
        id: 1,
        category_name: 'Personal',
        image_url: 'https://img.icons8.com/ios-glyphs/90/000000/hand-with-pen.png'
    },
    {
        id: 2,
        category_name: 'Wishlist',
        image_url: 'https://img.icons8.com/ios/90/000000/wish-list-filled.png'
    },
    {
        id: 3,
        category_name: 'Learn',
        image_url: 'https://img.icons8.com/ios-glyphs/90/000000/machine-learning.png'
    },
    {
        id: 4,
        category_name: 'Work',
        image_url: 'https://img.icons8.com/ios-glyphs/90/000000/check.png'
    },
];

const [selectedCategory, setSelectedCategory] = useState('');

  return (
        <ScrollView style={styles.ParentView}>
				<TextInput
					style={styles.title} 
					placeholder="ADD TITLE ..." 
				/>
				<TextInput 
					style={styles.description}
					multiline= {true}
					numberOfLines={10}
					placeholder="ADD DESCRIPTION ..." 
				/>
				<Picker
					style={styles.picker}
					selectedValue={selectedCategory}
					onValueChange={(itemValue, itemIndex) =>
						setSelectedCategory(itemValue)
					}>
					{
					  	categoryList.map((item) => {
					  		return(
					  			<Picker.Item key={item.id} label={item.category_name} value={item.id} />
					  		)
					  	})
					  }
				</Picker>
				<View style={{height: 100}} />
			</ScrollView>
  )
}

export default AddNotes

const styles = StyleSheet.create({
    ParentView: {
		padding: 30,
	},
	title:{
		fontSize: 20,
		textAlignVertical: 'top'
	},
	description: {
		fontSize: 20,
		textAlignVertical: 'top'
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
        flexGrow:1,
        alignSelf:'center',
	}

})
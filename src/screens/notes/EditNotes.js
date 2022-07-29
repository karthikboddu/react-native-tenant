import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/colors/colors';


const EditNotes = ({route,navigation}) => {


    const [data, setData] = React.useState({
        title: '',
        description: ''
    })

    const titleChange = (value) => {
        setData({
			title: value
		})
    }

    const descriptionChange = (value) => {
        setData({
			description : value
		})
    }




  return (
            <View style={styles.ParentView}>


            <SafeAreaView>
                <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.headerLeft}>
                        <Feather name="chevron-left" size={12} color={colors.textDark} />
                    </View>
                </TouchableOpacity>
                    <View style={styles.headerRight}>
                    <TouchableOpacity style={{marginRight: 15}}>
                    <Feather
                        name="check"
                        size={12}
                        color={colors.white}
                    />
                    </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

				<TextInput
					style={styles.title} 
					value={route.params.title}
					onChangeText={titleChange}
					placeholder="ADD TITLE ..." 
				/>
				<TextInput 
					style={styles.description}
					value={route.params.description}
					multiline= {true}
					numberOfLines={10}
					onChangeText={descriptionChange}
					placeholder="ADD DESCRIPTION ..." 
				/>
				{/* <Picker
					style={styles.picker}
					selectedValue={this.state.selectedCategory}
					onValueChange={(itemValue, itemIndex) =>
						this.setState({selectedCategory: itemValue})
					}>
					{
					  	this.state.category.map((item) => {
					  		return(
					  			<Picker.Item key={item.id} label={item.category_name} value={item.category_name} />
					  		)
					  	})
					}
				</Picker> */}
			</View>
  )
}

export default EditNotes

const styles = StyleSheet.create({
    ParentView: {
		margin: 30,
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
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      headerLeft: {
        borderColor: colors.textLight,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
      },
      headerRight: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 2,
      },
})
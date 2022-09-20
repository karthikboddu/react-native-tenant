import { useActionSheet } from "@expo/react-native-action-sheet";
import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';
import AddEditNotes from "../../components/notes/AddEditNotes";
import ListNotes from "../../components/notes/ListNotes/ListNotes";
import NoteStoreHeader from "../../components/notes/NoteStoreHeader";
import { GlobalContext } from '../../context/GlobalState';
import { deleteNotesById, saveNotes } from "../../services/tenant/noteService";
import { IconToggle } from "../../utils";
import commonStyles from '../styles';



const initialBookValues = {
    title: '',
    author: '',
    category: '',
	description: '',
    realm_id: '2F6092d4c594587f582ef165a0', // replace it with your loggedIn userId or Any static id for testing
	tenant_id : '61f64f9af320710016814606'
};

const initialAddEditBookModalValues = {
    pending: false,
    failed: false,
    visible: false,
    data: initialBookValues,
    isAdd: null
};

const NotesHome = ({navigation }) => {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addEditBookModal, setAddEditBookModal] = useState(initialAddEditBookModalValues);
    const {fetchAllTenantNotes, tenantNotesList} = useContext(GlobalContext);

    useEffect(() => {
        return fetchNotesListCall()
    }, []);

    const fetchNotesListCall = () => {
		fetchAllTenantNotes('');
        setNotes(notes)
        setLoading(false);
    }
    const onChangeInput = (inputValue, inputName) => {
        console.log(inputValue,"asdasd")
        setAddEditBookModal({
            ...addEditBookModal,
            data: {
                ...addEditBookModal.data,
                [inputName]: inputValue
            }
        });
    }

    const submitAddEditBook = async () => {

        try {
            const payload = JSON.stringify(addEditBookModal.data);
            const data = await saveNotes(payload);
            let resJson = await data.json();
            if (resJson.status == "200") {
                fetchAllTenantNotes('');
            } 
            setAddEditBookModal((prevState) => ({
             ...prevState,
             visible: false
         }));
        } catch (error) {
            console.log(error)
			if(error){
				setAddEditBookModal((prevState) => ({
					...prevState,
					pending: false,
					failed: true
				}));
			}
        }
    }

    const deleteBook = async (noteId) => {
        try {
            const data = await deleteNotesById(noteId);
            let resJson = await data.json();
            console.log(resJson,"Data")
            if (resJson.status == "200") {
                fetchAllTenantNotes('');
            } 
        } catch(error) { 
            if(error){
                console.log(error.message); 
            }
        }
    }

    const openAddEditBookModal = (action, data) => {
        setAddEditBookModal((prevState) => ({
            ...prevState,
            isAdd: action === 'add',
            visible: true,
            data
        }));

            // console.log(data,"item")
            // navigation.navigate('EditNotes', data)
    }

    const closeAddEditBookModal = () => {
        setAddEditBookModal((prevState) => ({
            ...prevState,
            visible: false
        }));
    }
    const { showActionSheetWithOptions } = useActionSheet();

    const icons = [
        <IconToggle
            set={'fontAwesome'} 
            name={'close'} 
            size={22} 
        />,
                        <IconToggle
                        set={'fontAwesome'} 
                        name={'edit'} 
                        size={22} 
                    />,
                <IconToggle
                set={'fontAwesome'} 
                name={'trash'} 
                size={22} 
            />
      ];

    const handleActionMenuList = (dataItem) => {
        showActionSheetWithOptions({
            options: ["Cancel", "Edit Book", "Delete Book"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'light',
            icons
        }, buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                // Edit Book
                openAddEditBookModal('edit', dataItem);
            } else if (buttonIndex === 2) {
                // Delete Book
                deleteBook(dataItem._id)
            }
        });
    }

    const renderHeader = () => {
        return (
            <View>
                <NoteStoreHeader openAddEditBookModal={openAddEditBookModal} />
                <View style={commonStyles.vSpace4} />
                {/* <Categories /> */}
                <View style={commonStyles.vSpace1} />
            </View>
        )
    }

    return (
        
        <View style={styles.containerWrap}>
			{addEditBookModal.visible ? (
		    <AddEditNotes 
                addEditNoteModal={addEditBookModal}
                closeAddEditBookNote={closeAddEditBookModal}
                submitAddEditNote={submitAddEditBook}
                onChangeInput={onChangeInput}
				handleActionMenuList={handleActionMenuList}
            />
			) : ( <>
            {loading ? (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator color="#4C4CFF" size="large" />
                </View>
            ) : (
                <View style={styles.contentContainerWrap}>
                    {renderHeader()}
                    <View style={commonStyles.vSpace2} />
                    <ListNotes 
                        loading={loading}
                        fetchNotesListCall={fetchNotesListCall}
                        handleActionMenuList={handleActionMenuList}
                        books={tenantNotesList}
                    />
                </View>
            )}
			</>)}

        </View>
    );
}

export default NotesHome;

const styles = StyleSheet.create({
    containerWrap: {
        flex:1, 
        backgroundColor:'white'
    },
    contentContainerWrap: {
        flex:1, 
        backgroundColor:'transparent'
    },
    activityIndicatorContainer: {
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    }
});
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../../components/Chat/ListItem';
import useContacts from '../../helpers/useHooks';

const Contacts = ({route}) => {

    const contacts = useContacts();

    useEffect(() => {
        console.log(contacts,"sad",route?.params?.fid)
    }, [])
    return (
        <FlatList
            style={{ flex: 1, padding: 10 }}
            data={contacts}
            keyExtractor={(_, i) => i}
            renderItem={({ item }) => <ContactPreview contact={item} fromUserId={route?.params?.fid} />}
        />
    )
}


const ContactPreview = ({contact, fromUserId}) => {
    const [user, setUser] = useState(contact);
    return (
        <ListItem
        style={{ marginTop: 7 }}
        type="contacts"
        user={user}
        fId = {fromUserId}
      />
    )
}

export default Contacts

const styles = StyleSheet.create({})
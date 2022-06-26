import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import endpoints from "../../endpoints";
import deviceStorage from "../../services/deviceStorage";
import List from "./Lists";
import SearchBar from "./SearchBar";


const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    

    let isSubscribed = true
    if (isSubscribed) {
      // getData();
    }
    return () => isSubscribed = false
  }, []);

  React.useEffect(() => {
    return () => {
      setFakeData([]);
    }
}, []);

  const getData = async () => {
    const accessToken = await deviceStorage.loadJWT();
    const apiResponse = await fetch(
      `${endpoints.apiUrl}` + `${endpoints.tenantsList}`,{
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': accessToken
      }}
    );
    const res = await apiResponse.json();
    setFakeData(res.data);
  };

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Programming Languages</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
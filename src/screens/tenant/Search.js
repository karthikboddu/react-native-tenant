import React, { useEffect, useState } from "react";
import {
    ActivityIndicator, SafeAreaView, StyleSheet,
    Text
} from "react-native";
import List from "../../components/Tenant/search/List";
import SearchBar from "../../components/Tenant/search/SearchBar";
import { getTenantList } from "../../services/tenant/tenantService";


const Search = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(true);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await getTenantList();
      
      const result = await apiResponse.json();
      setFakeData(result.data.tenants);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Search Tenants </Text>}

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
            navigation = {navigation}
          />
        
      )}
    </SafeAreaView>
  );
};

export default Search;

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
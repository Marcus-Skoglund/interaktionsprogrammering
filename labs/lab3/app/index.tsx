import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { dataFetch, Repository } from "../services/api";
import { RepoList } from "../components/repoList";

const index = () => {

  const [repository, setRepository] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const respons = await dataFetch();
      setRepository(respons);
    };
    fetchApi();
  }, [])


  return (
    <View style={styles.Container}>
      <FlatList
        data={repository}
        renderItem={({ item }) => (<RepoList repo={item} />)}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  Container: {
    padding: 20,
    backgroundColor: "#1e1c1cff",
    width: "100%",
    height: "100%",
  },

});

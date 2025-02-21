import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const BACKEND_URL = 'localhost:4000/search/'

const Search: React.FC = () => {

  const [searchFilters, setSearchFilters] = useState<object>({})
  const [searchSort, setSearchSort] = useState<object>({sortby: 'school.name', asc: 'true'})
  const [searchResults, setSearchResults] = useState<object>({})

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [colleges, setColleges] = useState<string[]>([]);
  
  
  // Simulating search logic
  const handleSearch = () => {
    const mockColleges = [
      'Harvard University',
      'Stanford University',
      'Massachusetts Institute of Technology',
      'University of California, Berkeley',
      'Princeton University',
    ];
  
    // Filter colleges based on the search term
    const filteredColleges = mockColleges.filter((college) =>
      college.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setColleges(filteredColleges);

    // call backend
    // axios.post(BACKEND_URL, {
    //   searchFilters,
    //   searchSort,
    // })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Colleges</Text>
      <ScrollView style={{ flexGrow: 1}}>
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Enter college name"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={colleges}
        renderItem={({ item }) => (
          <View style={styles.collegeItem}>
            <Text style={styles.collegeName}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  collegeItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  collegeName: {
    fontSize: 16,
  },
});

export default Search;
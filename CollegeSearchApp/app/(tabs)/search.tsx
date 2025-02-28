import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, Pressable, FlatList, StyleSheet } from 'react-native';
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

      <ScrollView style={styles.filterContainer}>
        <View style={styles.filterSet}>
          <Text style={styles.filterTitle}>College Name (if looking for specific school)</Text>
          <TextInput
            style={styles.filterTextInput}
            placeholder="Enter college name"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            />
        </View>

        <View style={styles.filterSet}>
          <Text style={styles.filterTitle}>Size (number of students)</Text>
          <View style={styles.filterRange}>
            <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            <Text style={styles.filterRangeDash}>-</Text>
            <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
          </View>
        </View>

        <View style={styles.filterSet}>
          <Text style={styles.filterTitle}>Ranking</Text>
          <View style={styles.filterRange}>
            <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            <Text style={styles.filterRangeDash}>-</Text>
            <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
          </View>
        </View>

        <View style={styles.filterSet}>
          <Text style={styles.filterTitle}>Average Net Cost</Text>
          <View style={styles.filterRange}>
            <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            <Text style={styles.filterRangeDash}>-</Text>
            <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
          </View>
        </View>

        <View style={styles.filterSet}>
          <Text style={styles.filterTitle}>Median SAT scores</Text>
          <View style={styles.filterRange}>
            <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            <Text style={styles.filterRangeDash}>-</Text>
            <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
          </View>
        </View>


        <View style={styles.buttonContainer}>
          <Button title="Search" onPress={handleSearch} />
        </View>
      </ScrollView>
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
  filterContainer: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#dedede',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    position: "relative",
    height: 'auto'
  },
  buttonContainer: {
    width: '50%',
    margin: 'auto',
  },
  filterSet: {
    
  },
  filterTitle: {
    paddingLeft: 5,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5
  },
  filterTextInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 15,
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  filterRange: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
  filterRangeInput: {
    width: '25%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 15,
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  filterRangeDash: {
    height: 40,
    width: '10%',
    textAlign: 'center',
    fontSize: 24,
    margin: 0,
    marginBottom: 15,
    padding: 0,
  },
  filterMultiText: {
    
  }
});

export default Search;
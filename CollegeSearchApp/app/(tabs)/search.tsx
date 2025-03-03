import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, Pressable, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const BACKEND_URL = 'localhost:4000/search/'

const Search: React.FC = () => {

  const [dropdownExpanded, setDropdownExpanded] = useState(false)
  const [searchFilters, setSearchFilters] = useState<object>({})
  const [searchSort, setSearchSort] = useState<object>({sortby: 'school.name', asc: 'true'})
  const [searchResults, setSearchResults] = useState<object>({})

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [colleges, setColleges] = useState<string[]>([]);
  
  const getDropdownVisibility = () => {
    if (dropdownExpanded) {
      return 'flex'
    } else {
      return 'none'
    }
  }
  
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
        <Text style={styles.filterCategoryTitle}>General</Text>
        <View style={styles.filterCategory}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>College Name</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="Enter college name"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Size (students)</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
        </View>

        <Text style={[styles.filterCategoryTitle, {display: getDropdownVisibility()}]}>Location</Text>
        <View style={[styles.filterCategory, {display: getDropdownVisibility()}]}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>City</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="Boston, Pittsburgh, e.g."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>State</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="MA, PA, etc."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Region</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="Mideast, e.g."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Locale</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="Urban, e.g."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
        </View>

        <Text style={[styles.filterCategoryTitle, {display: getDropdownVisibility()}]}>Distance-based Location</Text>
        <View style={[styles.filterCategory, {display: getDropdownVisibility()}]}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Your ZIP Code</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="15090, e.g."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Distance away (mi.)</Text>
            <TextInput
              style={styles.filterTextInput}
              placeholder="Enter college name"
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              />
          </View>
        </View>

        <Text style={styles.filterCategoryTitle}>Academics</Text>
        <View style={styles.filterCategory}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Ranking</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Acceptance Rate</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
          <View style={[styles.filterSet, {display: getDropdownVisibility()}]}>
            <Text style={styles.filterName}>Retention Rate</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
        </View>

        <Text style={styles.filterCategoryTitle}>Cost</Text>
        <View style={styles.filterCategory}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>In state tuition</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Out of state tuition</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
          <View style={[styles.filterSet, {display: getDropdownVisibility()}]}>
            <Text style={styles.filterName}>Average Net Cost</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
          </View>
        </View>

        <Text style={[styles.filterCategoryTitle, {display: getDropdownVisibility()}]}>Standardized Tests</Text>
        <View style={[styles.filterCategory, {display: getDropdownVisibility()}]}>

          <View style={styles.filterSet}>
            <Text style={styles.filterName}>Median SAT scores</Text>
            <View style={styles.filterRange}>
              <TextInput style={styles.filterRangeInput} placeholder="Min" keyboardType='numeric' value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
              <Text style={styles.filterRangeDash}>-</Text>
              <TextInput style={styles.filterRangeInput} placeholder="Max" value={searchTerm} onChangeText={(text) => setSearchTerm(text)} />
            </View>
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
  filterCategory: {
    width: '100%',
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  filterCategoryTitle: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 'auto',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  filterSet: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    width: '50%'
  },
  filterName: {
    //paddingLeft: 5,
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: 5,
    fontSize: 16,
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
    justifyContent: 'center',
    alignItems:'center'
  },
  filterRangeInput: {
    width: '45%',
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
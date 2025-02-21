import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EditThread: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();  // Get thread ID from params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch existing thread data
    const fetchThread = async () => {
      try {
        const response = await fetch(`http://localhost:4000/threads/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch thread');
        }
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch thread details.');
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleUpdateThread = async () => {
    if (title.trim() === "" || content.trim() === "") {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/threads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Thread updated successfully!');
        router.back(); // Navigate back to the previous screen
      } else {
        throw new Error('Failed to update thread');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Thread</Text>
      <TextInput
        style={styles.input}
        placeholder="Thread Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Thread Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateThread}>
        <Text style={styles.buttonText}>Update Thread</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditThread;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

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
        Toast.show({ type: 'error', text1: 'Error', text2: 'Could not fetch thread details.' });
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  const handleUpdateThread = async () => {
    if (title.trim() === "" || content.trim() === "") {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill in both fields.' });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/threads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Thread updated successfully!' });
        setTimeout(() => router.navigate('/(tabs)/HomeScreen'), 1500); // Navigate back to the previous screen after success
      } else {
        throw new Error('Failed to update thread');
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong. Try again.' });
    }
  };

  const handleCancel = () => {
    router.back(); // Navigate back
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
      {/* Buttons side by side */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateThread}>
          <Text style={styles.buttonText}>Update Thread</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Toast Message Component */}
      <Toast />
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
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Space them out evenly
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10, // Space between buttons
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditThread;

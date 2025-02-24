import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const CreateThread: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateThread = async () => {
    if (title === "" || content === "") {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill in both fields.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Thread created successfully!' });
        setTimeout(() => router.back(), 1500); // Navigate back after success
      } else {
        throw new Error('Failed to create thread');
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong. Try again.' });
    }
  };

  const handleCancel = () => {
    router.back(); // Navigate back
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Thread</Text>
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
        <TouchableOpacity style={styles.postButton} onPress={handleCreateThread}>
          <Text style={styles.buttonText}>Post Thread</Text>
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
  postButton: {
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
});

export default CreateThread;

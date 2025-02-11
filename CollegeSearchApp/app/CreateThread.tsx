import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const CreateThread: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  const handleCreateThread = async () => {
    if (title === "" || content === "") {
      alert('Error Please fill in both fields.')
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setPostSuccess(true)
        alert('Success: Thread created successfully!');
        router.back(); // Navigate back to HomeScreen
      } else {
        throw new Error('Failed to create thread');
      }
    } catch (error) {
      alert('Error: Something went wrong. Try again.');
    }
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
      <TouchableOpacity style={styles.button} onPress={handleCreateThread}>
        <Text style={styles.buttonText}>Post Thread</Text>
      </TouchableOpacity>
      <div hidden={!postSuccess} style={{backgroundColor: 'lime'}}>
        <p style={{color:'white'}}>Thread successfully posted!</p>
      </div>

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
});

export default CreateThread;

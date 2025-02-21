import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { FaEye, FaEdit } from "react-icons/fa"; 


interface Thread {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Homepage: React.FC = () => {
  const router = useRouter();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState<boolean>(false);

  // Fetch threads when "View All" is toggled
  useEffect(() => {
    if (viewAll) {
      const fetchThreads = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:4000/threads');
          if (!response.ok) {
            throw new Error('Failed to fetch threads');
          }
          const data = await response.json();
          setThreads(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchThreads();
    }
  }, [viewAll]);

  const renderThreadItem = ({ item }: { item: Thread }) => (
    <View style={styles.threadItem}>
      <Text style={styles.threadTitle}>{item.title}</Text>
      <Text style={styles.threadContent}>{item.content}</Text>
      <Text style={styles.threadDate}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>

      {/* Edit Button */}
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => router.push(`/EditThread?id=${item._id}`)}
      >
        <FaEdit />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Find Your Perfect College</Text>
        <Text style={styles.subtitle}>
          Discover and explore the best colleges based on your preferences.
        </Text>

        {/* Threads Section */}
        {viewAll && (
          <View style={styles.threadsContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : error ? (
              <Text style={styles.errorText}>Error: {error}</Text>
            ) : threads.length === 0 ? (
              <Text style={styles.noThreadsText}>No threads available</Text>
            ) : (
              <FlatList
                data={threads}
                renderItem={renderThreadItem}
                keyExtractor={(item) => item._id}
              />
            )}
          </View>
        )}

      {/* View All Threads Button */}
        <TouchableOpacity style={styles.viewAllButton} onPress={() => setViewAll(!viewAll)}>
          <Text style={styles.buttonText}>
            {viewAll ? 'Hide Threads' : 'View All Threads'}
          </Text>
        </TouchableOpacity>

        {/* Get Started Button */}
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>

        {/* Create Thread Button */}
        <TouchableOpacity style={styles.createThreadButton} onPress={() => router.push('/CreateThread')}>
          <Text style={styles.buttonText}>Create Thread</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  threadsContainer: {
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20, 
  },
  createThreadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 40,
  },
  viewAllButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30, 
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  threadItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  threadContent: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  threadDate: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noThreadsText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFA500',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Homepage;

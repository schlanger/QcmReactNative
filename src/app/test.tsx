import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Index() {
  
  const params = useLocalSearchParams();
  const [question, setQuestion] = useState<string | null>(null);

  const fetchQuestionById = async (id:number) => {
    try {
        const response = await axios.get(`https://qcm-api-a108ec633b51.herokuapp.com/questions/${id}`);
        //console.log(response.data.rows[0])
        return response.data.rows[0].intitule;
        console.log(response.data.rows[0].intitule)
    } catch (error) {
        console.error('Error fetching question:', error);
        return null;
    }
};

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchQuestionById(1);
      setQuestion(result);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.size}>Bonjour {params.name}!!</Text>
      <Text style={styles.size}> {question}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  size: {
    fontSize: 30,
    textDecorationColor: 'red',
    color: 'white',

  }
});

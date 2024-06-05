import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import MyButton from '../Component/MyButton';
import { Stack } from 'expo-router';
import TimerComponent from "../Component/TimerComponent";

export default function Index() {


  const params = useLocalSearchParams();
  const [question, setQuestion] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<number>(1);
  const [responses, setResponses] = useState<string[]>([]); // Utilisez un tableau pour stocker les réponses

  const fetchQuestionById = async (id: number) => {
    try {
      const response = await axios.get(`https://qcm-api-a108ec633b51.herokuapp.com/questions/${id}`);
      return response.data.rows[0].intitule;
    } catch (error) {
      console.error('Error fetching question:', error);
      return null;
    }
  };

  const fetchResponsesByQuestionId = async (id: number) => {
    try {
      const response = await axios.get(`https://qcm-api-a108ec633b51.herokuapp.com/reponse/${id}`);
      return response.data.rows.map((row: any) => row.titre); // Mappez les réponses de la réponse JSON
    } catch (error) {
      console.error('Error fetching responses:', error);
      return [];
    }
  };

  const goToNextQuestion = async () => {
    const nextQuestionId = questionId + 1;
    if (nextQuestionId > 4) {
      router.navigate({
        pathname: '/',
      });
      return;
    }
    const result = await fetchQuestionById(nextQuestionId);
    const responses = await fetchResponsesByQuestionId(nextQuestionId);
    setQuestionId(nextQuestionId);
    setQuestion(result);
    setResponses(responses);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchQuestionById(1);
      const responses = await fetchResponsesByQuestionId(1);
      setQuestion(result);
      setResponses(responses);
    };

    fetchData();
  }, []);

  return (

    <View style={styles.container}>

      <Stack.Screen options={{ title: 'Quizz', headerStyle: {backgroundColor: 'white'} }} />
      <Text style={styles.size}>Bonjour {params.name}!!</Text>
      <TimerComponent duration={10} />
      <Text style={styles.size}>{question}</Text>

      {/* Afficher les réponses de manière aléatoire */}

      {responses.map((response, index) => (
        <TouchableOpacity style ={styles.pad}  key={index} onPress={() => goToNextQuestion()}>
          <MyButton  handleRedirect={goToNextQuestion} buttonText={response} />
        </TouchableOpacity>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A4FBF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  size: {
    fontSize: 30,
    textDecorationColor: 'red',
    color: 'white',
    justifyContent: 'center',
    padding: 10,
  },
  pad: {
    padding: 10,
  }

});

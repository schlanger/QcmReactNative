import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyButton from '../Component/MyButton';
import { Stack } from 'expo-router';
import TimerComponent from "../Component/TimerComponent";
import {useApi} from "../hook/useApi";

export default function Index() {


  const {score, question, responses, checkAnswer , params} = useApi();




    return (
        <View style={styles.container}>
          <Text style={styles.score}>Score: {score}  </Text>
          <Stack.Screen options={{ title: 'Quizz', headerStyle: {backgroundColor: 'white'} }} />
          <Text style={styles.size}>Bonjour {params.name}!!</Text>
          <TimerComponent duration={10} />
          <Text style={styles.size}>{question}</Text>
          {responses.map((response, index) => (
              <View style={styles.pad} key={index} >
                <MyButton handleRedirect={() => checkAnswer(response.title)}  buttonText={response.title} />
              </View>
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
  },
  score: {
    fontSize: 20,
    color: 'white',
  },

});

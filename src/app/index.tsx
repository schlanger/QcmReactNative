import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import MyButton from '../Component/MyButton';


export default function Index() {

    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');

  const router = useRouter();

  const handleRedirect = () => {
    router.navigate({
      pathname: '/test',
      params: { name: text }
      
    });
    }

  return (
      <View style={styles.container}>
      <Stack.Screen options={{ title: 'Quizz', headerStyle: {backgroundColor: "#8A4FBF"} }} />
    <SafeAreaView> 
    <Text>Bienvenue dans notre App de QCM!!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <StatusBar style="auto" />
      
      <MyButton handleRedirect={handleRedirect} buttonText='commencer le QCM ' />
      </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },});

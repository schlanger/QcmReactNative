import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import React from 'react';
import {SafeAreaView, TextInput} from 'react-native';


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
    <PaperProvider>
      <View style={styles.container}>
    <SafeAreaView> 
    <Text>Bienvenue dans notre App de QCM!!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <StatusBar style="auto" />
      
      <Button mode="elevated" onPress={() => {handleRedirect()}}>Commencer le QCM !!</Button>
      </SafeAreaView>
      </View>
  </PaperProvider>
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

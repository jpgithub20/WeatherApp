import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import { API_KEY } from './openWeatherAppAPIKey.js';

export default function App() {
  const [data, setData] = useState('');
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');

  const getBackground = (data) => {
    try {
      if (data.weather[0].main == 'Thunderstorm' ) {
        return require(`./assets/rain.jpg`)
      }
      else if (data.weather[0].main == 'Drizzle' ) {
        return require(`./assets/rain.jpg`)
      }
      else if (data.weather[0].main == 'Rain' ) {
        return require(`./assets/rain.jpg`)
      }
      else if (data.weather[0].main == 'Snow' ) {
        return require(`./assets/clouds.jpg`)
      }
      else if (data.weather[0].main == 'Clear' ) {
        return require(`./assets/sun.jpg`)
      }
      else if (data.weather[0].main == 'Clouds' ) {
        return require(`./assets/clouds.jpg`)
      }
      else {
        return require(`./assets/clouds.jpg`)
      }
    } catch {
      return require(`./assets/sun.jpg`)
    }
      
  }

  const getWeather = (input) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
      setData(data)
      setName(data.name)
      setTemp(data.main.temp + '°F')
      setDesc(data.weather[0].description)
      })
      .catch(error => {
        setName('Invalid city')
        setTemp('')
        setDesc('')
      })
    }
    

  return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <ImageBackground
        source={getBackground(data)}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.background}
        >
        <View style={styles.container}>
            <TextInput 
            placeholder="Search for a city"
            onChangeText={text => setInput(text)}
            onSubmitEditing={a => getWeather(input)}
            style={styles.searchbox}
            ></TextInput>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{temp}</Text> 
            <Text style={styles.text}>{desc}</Text>
            <StatusBar style="auto" />   
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  background: {
    opacity: 0.6
  },
  text: {
    fontSize: 30,
  },
  searchbox: {
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 10,
    fontSize: 20,
    borderRadius: 16,
  },
});

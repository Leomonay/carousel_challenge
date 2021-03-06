import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View } from 'react-native';
import Carousel from './src/components/Carousel/index';

export default function App() {
    return (
    <View style={styles.container}>
      <Carousel/>
      <StatusBar style="auto" />
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

});

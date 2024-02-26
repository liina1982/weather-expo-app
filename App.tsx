import { StyleSheet } from 'react-native';
import HomeBackground from './components/HomeBackground';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
      <>
        <StatusBar style='light' />
        <HomeBackground/>
      </>
    );
}

const styles = StyleSheet.create({});

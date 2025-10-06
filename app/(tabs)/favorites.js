// app/(tabs)/favorites.js

import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoritesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
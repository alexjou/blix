import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para salvar os dados do usuário no AsyncStorage
export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Erro ao salvar os dados no AsyncStorage:', error);
  }
};

// Função para obter os dados do usuário do AsyncStorage
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const userObject = JSON.parse(userData);
      return userObject;
    } else {
      return null; // Retorne null se não houver dados no AsyncStorage
    }
  } catch (error) {
    console.error('Erro ao obter os dados do AsyncStorage:', error);
    return null;
  }
};


// Função para excluir os dados do usuário do AsyncStorage
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Erro ao excluir os dados do AsyncStorage:', error);
  }
};

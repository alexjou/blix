/* eslint-disable array-callback-return */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import WeightChart from '../../Components/ChartStyled';
import { AuthContext } from '../../Contexts/AuthContext';
import Modal from 'react-native-modal';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageList from '../../Components/ImageList';
import { optionsLocale } from '../../utils/ChartConfig';

const ProfileScreen = () => {
  const { user, updateUser, getDataUser, logout } = useContext(AuthContext);

  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [updates, setUpdates] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const objetivoOptions = [
    { label: 'Emagrecer', value: 'Emagrecer' },
    { label: 'Ganhar massa', value: 'Ganhar massa' },
    { label: 'Definir o corpo', value: 'Definir o corpo' },
    { label: 'Bem-estar', value: 'Bem-estar' },
  ];

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('A permissão para acessar a biblioteca de mídia foi negada.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const handleUpdateUser = async () => {
    setLoading(true);

    const result = await updateUser({ peso, objetivo, photos, createdAt: new Date() })

    if (result) {
      void getUpdates();
      toggleModal();
      setPeso('');
      setObjetivo('')
      setPhotos([])
    }

    setLoading(false);
  }

  const getUpdates = async () => {
    const result = await getDataUser();
    setUpdates(result)
  }

  function extractWeights(data: any[]) {
    const weightsArray = data.map((item: { peso: string; }) => parseFloat(item.peso)); // Converte os pesos para números
    return weightsArray;
  }
  function extractDate(data: any[]) {
    const createdAtArray = data.map((item: { createdAt: any; }) => item.createdAt.toDate().toLocaleDateString('pt-br', optionsLocale)); // Converte os pesos para números
    return createdAtArray;
  }

  const weights = extractWeights(updates);
  const createdAt = extractDate(updates);

  useEffect(() => {
    void getUpdates()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewBetween}>
        <Text style={styles.title}>Olá, {user?.name}</Text>
        <Icon name='sign-out' size={30} color='black' onPress={logout} />
      </View>

      <View style={styles.section}>
        <View style={styles.viewRow}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <Icon name='plus' size={20} color='aqua' onPress={toggleModal} />
        </View>
        <Text>E-mail: {user?.email}</Text>
        <Text>Telefone: {user?.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progresso de Peso</Text>
        {updates?.length > 0 ? <WeightChart labels={createdAt} weights={weights} /> : <ActivityIndicator color="aqua" size={100} />}
      </View>

      <Text style={styles.sectionTitle}>Fotos</Text>
      {updates?.map((e: any, index: any) =>
        <View key={index}>
          <Text> {e.createdAt.toDate().toLocaleDateString('pt-br', optionsLocale)}</Text>

          {e.photos?.length > 0 ? <ImageList key={index} data={e?.photos} /> : <Text key={index}>Sem fotos</Text>}
        </View>
      )}

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.viewBetween}>
              <Text style={styles.sectionTitle}>Atualização</Text>
              <Icon name='close' size={20} color='black' onPress={toggleModal} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Peso (em kg)"
              keyboardType="numeric"
              value={peso}
              onChangeText={(text) => { setPeso(text); }}
            />

            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Picker
              selectedValue={objetivo}
              onValueChange={(value: React.SetStateAction<string>) => {
                setObjetivo(value);
              }}
            >
              {objetivoOptions?.map((e, index) =>
                <Picker.Item key={index} label={e.label} value={e.value} />
              )}
            </Picker>

            <View style={styles.section}>
              <View style={styles.viewRow}>
                <Text style={styles.sectionTitle}>Fotos</Text>
                <Icon name='plus' size={20} color='blue' onPress={handleAddPhoto} />
              </View>
            </View>
            <View style={styles.photoContainer}>
              <ImageList data={photos} />
            </View>

            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.textButton}>Salvar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonCancel} onPress={toggleModal}>
                <Text style={styles.textButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;

import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc, doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import { getUserData, removeUserData, saveUserData } from './LocalStorage';
import { db, storage } from '../Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const login = async (values) => {
    const { email, password } = values;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', response.user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUser(userData);
        await saveUserData(userData);
      } else {
        showMessage({
          message: 'Usuário não encontrado.',
          type: 'danger',
        });
        console.error('Usuário não encontrado');
        return null;
      }
    } catch (error) {
      showMessage({
        message: 'Erro ao fazer o login.',
        type: 'danger',
      });
      console.error('Erro ao realizar o login:', error);
      setUser(null);
    }
  };

  const register = async (values) => {
    const { email, name, password, phone } = values
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', response.user.uid), { name, phone, email, id: response.user.uid });

      const userData = {
        name,
        phone,
        email,
        id: response.user.uid,
      };

      await saveUserData(userData);

      showMessage({
        message: 'Cadastro realizado com sucesso!',
        type: 'success',
      });
      setUser(userData);
    } catch (error) {
      showMessage({
        message: 'Erro ao realizar o cadastro.',
        type: 'danger',
      });
      console.error('Erro ao realizar o cadastro:', error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await removeUserData()
      setUser(null);
    } catch (error) {
      console.error('Erro ao realizar o logout:', error);
    }
  };

  const logedin = async () => {
    const result = await getUserData();
    if (result) {
      setUser(result)
    }
  }

  const updateUser = async (params) => {
    try {
      const userRef = doc(db, 'users', user?.id);
      const userUpdatesCollectionRef = collection(userRef, 'updates');

      if (params.photos.length > 0) {
        const photoUrls = await Promise.all(
          params.photos.map(async (photo) => {
            const storageRef = ref(storage, `img/${user.id}/${params.createdAt}`);
            const response = await fetch(photo);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);

            // Obtém a URL da imagem após o upload
            return await getDownloadURL(storageRef);
          })
        );

        params.photos = photoUrls;

        // Salve os dados atualizados no Firestore
        await addDoc(userUpdatesCollectionRef, params);

        return true;
      }
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      return false;
    }
  };


  const getDataUser = async () => {
    try {
      const userRef = doc(db, 'users', user?.id);
      const userCollectionRef = collection(userRef, 'updates');

      const querySnapshot = await getDocs(userCollectionRef);

      const userUpdates = [];
      for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        const userId = doc.id;

        if (userData.photos && Array.isArray(userData.photos)) {
          const photoUrls = await Promise.all(
            userData.photos.map(async (photo) => {
              const imageRef = ref(storage, photo);
              return await getDownloadURL(imageRef);
            })
          );

          userData.photos = photoUrls;
        }

        userUpdates.push({ id: userId, ...userData });
      }

      return userUpdates;
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      return [];
    }
  };


  useEffect(() => {
    void logedin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUser,
        getDataUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

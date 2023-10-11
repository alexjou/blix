import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as yup from 'yup';
import styles from './styles';
import { Formik } from 'formik';
import { Logo } from '../../Components/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Contexts/AuthContext';

import Icon from 'react-native-vector-icons/FontAwesome';
export default function SignIn({ navigation }: any) {

  const { login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    password: yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true)
    await login(values);
    setLoading(false)
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgb(192, 77, 226)', 'rgb(52, 12, 127)']}
    >
      <View style={styles.container}>
        <Logo />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={[styles.input, !!errors.email && styles.inputError]}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, !!errors.password && styles.inputError, styles.passwordInput]}
                  placeholder='Senha'
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color='white' />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <View style={styles.viewSubmit}>
                <TouchableOpacity style={styles.button} onPress={(e: any) => { handleSubmit(e); }}>
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.textButton}>Entrar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

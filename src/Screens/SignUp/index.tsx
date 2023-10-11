import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../Contexts/AuthContext';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Logo } from '../../Components/Logo';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';

export default function SignUp({ navigation }: any) {

  const { register } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: yup
      .string()
      .required('Celular é obrigatório'),
    password: yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    await register(values);
    setLoading(false);
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
        <Text style={styles.title}>Criar conta</Text>
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={[styles.input, !!errors.email && styles.inputError]}
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder="Nome"
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                style={[styles.input, !!errors.email && styles.inputError]}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                style={[styles.input, !!errors.phone && styles.inputError]}
                placeholder='Telefone'
                onChangeText={handleChange('phone')}
                value={values.phone}
              />
              {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, !!errors.password && styles.inputError, styles.passwordInput]}
                  placeholder='Senha'
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color='gray' />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <View style={styles.viewSubmit}>
                <TouchableOpacity style={styles.button} onPress={(e: any) => { handleSubmit(e); }}>
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.textButton}>Criar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancel} onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.textButton}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

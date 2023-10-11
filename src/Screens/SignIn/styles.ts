import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    width: '50%',
    flex: 1,
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    backgroundColor: 'rgb(5, 195, 203)',    
    margin: 10
  },
    buttonCancel: {
    flex: 1,
    width: '50%',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    borderColor: 'rgb(5, 195, 203)',
    borderWidth: 1,
    margin: 10
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
   passwordContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: -30,
    marginBottom: 10,
  },
  viewSubmit: {
    flexDirection: 'row',
    width: '85%'
  }
})

export default styles;

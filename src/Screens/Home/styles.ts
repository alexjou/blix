import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    marginBottom: 16,
  },
  addPhotoText: {
    color: 'blue',
    fontSize: 16,
    marginBottom: 8,
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  viewBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewRow: {
    flexDirection: 'row',
    gap: 10,
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
    color: 'black',
  },
});

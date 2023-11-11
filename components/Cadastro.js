import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import Firebase from './Firebase';

export default function Cadastro({navigation}){
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);

  function cadastrar(){
    Firebase.auth().createUserWithEmailAndPassword(email,senha).then(()=>{
      Alert.alert("Atenção","Dados cadastrados. Faça login.");navigation.navigate('Login',{email})
    }).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
        if(errorCode == "auth/email-already-in-use"){
          Alert.alert("Atenção", "Este e-mail já está cadastrado");
        }
        else if(errorCode == "auth/weak-password")
        {
          Alert.alert("Senha", "Deve ter no mínimo 6 caracteres.");
        }
        else if(errorCode == "auth/invalid-email")
        {
          Alert.alert("Email", "E-mail inválido.");
        }
        Alert.alert(errorCode)
    });
  }

  return(
    <View style={styles.container}>
      <Image source={require('../assets/camera.jpg')}style={styles.img}/>
      <Text style={styles.titulo}> Cadastre-se </Text>
        <TextInput style={styles.campo} onChangeText={(email) => setEmail(email)} value={email}placeholder="Digite o seu e-mail" required />
        <TextInput style={styles.campo} secureTextEntry={true} onChangeText={(senha)=> setSenha(senha)} value={senha} placeholder="Digite a sua senha" required />
        <TouchableOpacity style={styles.butn} onPress={()=>{cadastrar()}}>
          <Text style={styles.stylebutn}> Cadastrar </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.butn} onPress={()=>navigation.navigate('Acesso')}>
          <Text style={styles.stylebutn}> Cancelar </Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  campo:{
    width: 300,
    backgroundColor: '#77aaff',
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  butn:{
    marginTop: 20,
    backgroundColor: '#af163d',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  stylebutn:{
    fontSize: 25,
    color: '#ffffff'
  },
  img:{
    width: 250,
    height: 200,
    borderRadius: 30,
  },
  titulo:{
    marginVertical: 40,
    fontSize: 30
  },
})
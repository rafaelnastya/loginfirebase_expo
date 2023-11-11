import { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Firebase from './Firebase';
export default function Acesso({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function dados(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }
  function logar(){
    Firebase.auth().signInWithEmailAndPassword(email, senha).then(()=>{
      if(user){
        alert('Usuário não existe.');
        return;
      }
      navigation.navigate('Home',{email});
    })
    .catch((error) =>{
      alert(error);
      navigation.navigate('Acesso');
    })
  }

  useEffect(()=>{
    Firebase.auth().onAuthStateChanged( function(user){
      const uid = user.uid;
      const email = user.email;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <Image style={styles.img} source={require('../assets/taking.jpg')}/>
      <Text style={styles.title}>
        Aplicativo de Fotos
      </Text>
      <TextInput style={styles.input} onChangeText={(email) => setEmail(email)} value={email} placeholder="Digite o E-mail"/>
      <TextInput style={styles.input} onChangeText={(senha) => setSenha(senha)} value={senha} placeholder="Digite a Senha"/>
      <TouchableOpacity style={styles.butnAcesso} onPress={()=>{logar();
      }}>
        <Text>ACESSAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.butnAcesso} onPress={() => navigation.navigate('Cadastro')}>
        <Text>CADASTRAR</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 24,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img:{
    width: 330,
    borderRadius: 100,
    height: 250,
    alignItems: 'center'
  },
  butnAcesso:{
    marginTop: 20,
    backgroundColor: '#af163d',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  input:{
    width: 300,
    backgroundColor: '#77aaff',
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

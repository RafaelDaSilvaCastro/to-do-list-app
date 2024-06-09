import React from "react";
import { useState } from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";


//BANCO
import openDB from "../../db/db";
const db = openDB();




export default function CriarTarefa({ navigation }) {

  const [tarefa, setTarefa] = useState("")
  const showToast = () =>{
    ToastAndroid.show(
      "Tarefa criada",
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    )

    setTarefa('')
  }

  async function addTask(xDescricao){
    try{
     await db.runAsync('INSERT INTO TAREFAS(DESCRICAO) VALUES(?)', xDescricao)
      console.log('---------------------------------------')
      console.log('SUCESSO')
      console.log('---------------------------------------')
  
      showToast()
    }
    catch(err){
      console.error('---------------------------------------')
      console.error('ERRO')
      console.error(err)
      console.error('---------------------------------------')
  
    }
  
  }  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Crie suas tarefas aqui</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={tarefa}
          onChangeText={setTarefa}
          style={styles.textInput}
          placeholder="Passear com o cachorro..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Criar a tarefa"
          onPress={async () => {await addTask(tarefa) }   /*() => navigation.navigate("Main")*/}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50", // Green
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
});

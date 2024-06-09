import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native";

//BANCO
import openDB from "../../db/db";
import { FlatList } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";

const db = openDB();

export default function Main({ navigation }) {
  const [tarefas, setTarefas] = useState([]);

  async function fetchData() {
    const rows = await db.getAllAsync('SELECT * FROM TAREFAS');
    setTarefas(rows);
    console.log('Carrega')
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
  
    return unsubscribe;
  }, [navigation]);

async function dellTask(idTask){
  try{
    await db.runAsync('DELETE FROM TAREFAS WHERE ID = ?', idTask)
    console.log('---------------------------------------')
    console.log('SUCESSO')
    console.log('O registro ? foi deletado', idTask)
    console.log('---------------------------------------')

    fetchData()
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
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksHeader}>Tarefas criadas</Text>
        <FlatList
          data={tarefas}
          renderItem={({ item }) => (
            <Fragment >
              <Checkbox onPress={async () => {await dellTask(item.id)}} />
              <Text style={styles.taskDescription}>{item.descricao}</Text>
            </Fragment>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => navigation.navigate("criar")}
      >
        <Image
          style={styles.floatButton}
          source={{ uri: 'https://raw.githubusercontent.com/tranhonghan/images/main/plus_icon.png' }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  tasksContainer: {
    marginBottom: 20,
  },
  tasksHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#4CAF50', // Green
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: '#4CAF50', // Green
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  checkboxContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
  },
  checkboxIcon: {
    tintColor: '#4CAF50',
    fontSize: 18,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
});


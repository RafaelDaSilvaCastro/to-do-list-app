import React from "react"
import { View, Text, Button} from "react-native"

export default function Form({navigation}){
  return(
    <View>
      <View>
         <Text>Tarefas criadas</Text>
         <Text onPress={()=> navigation.navigate('criar')}>Teste</Text>
      </View>
      <Button title="Criar tarefa" onPress={()=> navigation.navigate('Main')}/>
    </View>
  );
}
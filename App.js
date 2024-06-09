import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/componentes/main';


import CriarTarefa from './src/pages/CriarTarefa';

const Stack = createStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='criar' component={CriarTarefa}/>       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


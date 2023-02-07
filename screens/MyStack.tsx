import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MusicPlayerScreen from './MusicPlayerScreen';
import TrackListScreen from './TrackListScreen';

const Tab = createBottomTabNavigator();

function FirstScreen() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MusicPlayerScreen"
        component={MusicPlayerScreen}
        options={{title: 'Music Player Screen', headerShown: true}}
      />
    </Tab.Navigator>
  );
}
const RootStack = createStackNavigator();

function MyStack() {
  return (
    <RootStack.Navigator initialRouteName="First">
      <RootStack.Screen
        name="First"
        component={FirstScreen}
        options={{headerShown: false}}
      />
      {/* <RootStack.Screen
        name="MusicPlayerScreen"
        component={MusicPlayerScreen}
        options={{title: 'Music Player Screen', headerShown: true}}
      /> */}
      <RootStack.Screen
        name="TrackListScreen"
        component={TrackListScreen}
        options={{title: 'Track List Screen', headerShown: true}}
      />
    </RootStack.Navigator>
  );
}

export default MyStack;

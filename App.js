import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from './components/Layout/Header';
import Homepage from './screens/Homepage';
import StocksList from './screens/StocksList';
import StockDetail from './screens/StockDetail';
import GlobalAnalysis from './screens/GlobalAnalysis';
import Colors from './constants/colors';

class StockDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const state = navigation.getParam('state');
    return {
      headerTitle: () => (
        <Text style={{color: 'white', fontSize: 18}}>
          {navigation.getParam('name')}
        </Text>
      ),
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: state === 'increasing' ? '#03AC83' : '#F45959',
        elevation: 0,
        height: 60,
        color: 'white',
      },
      headerTintColor: 'white',
    };
  };
  render() {
    return (
      <View style={styles.screen}>
        <StockDetail navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  bottomNavigator: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 10 : 10,
    paddingBottom: Platform.OS === 'ios' ? 40 : 10,
    alignItems: 'center',
  },
  navigationTitle: {
    color: Colors.title,
    fontSize: 20,
    textAlign: 'center',
  },
});

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-cash`;
  } else if (routeName === 'StocksList') {
    iconName = `ios-wallet`;
  } else if (routeName === 'GlobalAnalysis') {
    iconName = `ios-globe`;
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const MaterialBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Homepage,
    },
    GlobalAnalysis: {
      screen: GlobalAnalysis,
    },
    StocksList: {
      screen: StocksList,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    navigationOptions: {
      header: <Header />,
      headerBackTitle: null,
    },
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabStyle: {
        backgroundColor: Colors.dark,
      },
    },
  },
);

const AppStack = createStackNavigator({
  Home: {screen: MaterialBottomTabNavigator},
  StockDetail: {
    screen: StockDetailsScreen,
  },
});

const switchNavigator = createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  },
);

const AppContainer = createAppContainer(switchNavigator);

export default AppContainer;

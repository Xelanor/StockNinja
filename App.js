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
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Header from './components/Layout/Header';
import Homepage from './screens/Homepage';
import StocksList from './screens/StocksList';
import StockDetail from './screens/StockDetail';
import Colors from './constants/colors';

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Header />,
    headerBackTitle: null,
  };
  state = {
    screen: 'stocks',
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
          {this.state.screen === 'stocks' ? (
            <Homepage navigation={this.props.navigation} />
          ) : (
            <StocksList />
          )}
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              backgroundColor: Colors.secondary,
            }}>
            <View style={styles.bottomNavigator}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({screen: 'stocks'});
                }}>
                <Text style={styles.navigationTitle}>Hisse Senetlerim</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({screen: 'allStocks'});
                }}>
                <Text style={styles.navigationTitle}>Bütün Hisseler</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class StockDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <Text style={{color: 'white', fontSize: 18}}>
          {navigation.getParam('name')}
        </Text>
      ),
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: '#03AC83',
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    StockDetail: StockDetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.dark,
        elevation: 0,
        height: 60,
      },
    },
  },
);

export default createAppContainer(AppNavigator);

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import axios from 'axios';

import Colors from '../constants/colors';

class StocksList extends Component {
  state = {
    stocks: null,
    loading: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => this.getData());
    this.getData();
  }

  getData = async () => {
    await this.setState({loading: true});
    await axios
      .get('http://34.67.211.44/api/transaction')
      .then(res => {
        this.setState({stocks: res.data});
      })
      .catch(err => console.error(err));
    this.setState({loading: false});
  };

  render() {
    return (
      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.screen}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.headerText}>Yatırımlar</Text>
            </View>
          </View>
          {this.state.loading ? (
            <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View />
          )}
          {this.state.stocks ? (
            <View style={{paddingTop: 20}}>
              {this.state.stocks.map(stock => {
                return (
                  <View style={styles.container}>
                    <View key={stock._id}>
                      <View style={styles.row}>
                        <View style={styles.col}>
                          <Text style={styles.titleText}>Hisse: </Text>
                          <Text style={styles.defaultText}>{stock.name}</Text>
                        </View>
                        <View style={styles.col}>
                          <Text style={styles.titleText}>Fiyat: </Text>
                          <Text style={styles.defaultText}>{stock.price}</Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.col}>
                          <Text style={styles.titleText}>Adet: </Text>
                          <Text style={styles.defaultText}>{stock.amount}</Text>
                        </View>
                        <View style={styles.col}>
                          <Text style={styles.titleText}>Durum: </Text>
                          <Text style={styles.defaultText}>{stock.type}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '90%',
    paddingTop: 15,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
    marginHorizontal: 15,
    padding: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  input: {
    width: 90,
    textAlign: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
  },
  head: {
    height: 25,
    backgroundColor: Colors.secondary,
  },
  titleText: {margin: 6, color: 'white', fontWeight: 'bold', fontSize: 16},
  defaultText: {margin: 6, color: 'white', textAlign: 'center', fontSize: 14},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default StocksList;

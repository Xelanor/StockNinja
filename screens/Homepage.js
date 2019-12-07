import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import HomepageTable from '../components/HomepageTable/HomepageTable';
import Colors from '../constants/colors';

class Homepage extends Component {
  state = {
    stocks: null,
    tableHead: ['', 'Fiyat', 'Düşük-Yüksek', 'Fark'],
    loading: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(
        'https://my4wv99yv6.execute-api.us-east-1.amazonaws.com/default/fetch_stock_data',
      )
      .then(res => {
        const data = res.data;
        this.setState({stocks: data});
      })
      .catch(err => console.error(err));
  };

  deleteStock = name => {
    axios
      .post('https://teknodeneyim.com/stocks/delete', {name})
      .then(res => {})
      .catch(err => console.error(err));
    this.getData();
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
          {this.state.loading ? (
            <View style={[styles.container, styles.loading]}>
              <ActivityIndicator size="large" color="rgb(134, 65, 244)" />
            </View>
          ) : (
            <View></View>
          )}
          {this.state.stocks ? (
            <HomepageTable
              stocks={this.state.stocks}
              headers={this.state.tableHead}
              refresh={this.getData}
              activeStock={this.state.activeStock}
              delete={this.deleteStock}
              navigation={this.props.navigation}
            />
          ) : (
            <View style={[styles.container, styles.loading]}>
              <ActivityIndicator size="large" color="rgb(134, 65, 244)" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: Colors.dark,
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 20,
    height: '100%',
    width: '100%',
  },
});

export default Homepage;

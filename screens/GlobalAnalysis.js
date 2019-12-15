import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Table, Row, TableWrapper, Cell} from 'react-native-table-component';

import StocksListTable from '../components/StocksListTable/StocksListTable';
import Colors from '../constants/colors';

class StocksList extends Component {
  state = {
    rsi: 0,
    ninja: 0,
    stocks: null,
    tableHead: ['', 'Fiyat', 'Düşük-Yüksek', 'Fark'],
  };

  fetchGlobalAnalysis = () => {
    axios
      .post('http://34.67.211.44/api/ticker/global', {
        rsi: this.state.rsi,
        ninja: this.state.ninja,
      })
      .then(res => {
        this.setState({stocks: res.data});
        console.log(res.data);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.screen}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.headerText}>RSI Max</Text>
              <TextInput
                style={styles.input}
                value={this.state.rsi}
                keyboardType="decimal-pad"
                onChangeText={e => this.setState({rsi: e})}
                maxLength={8}></TextInput>
            </View>
            <Ionicons name={'ios-add'} size={50} color={'tomato'} />
            <View style={styles.col}>
              <Text style={styles.headerText}>NINJA Max</Text>
              <TextInput
                style={styles.input}
                value={this.state.ninja}
                keyboardType="decimal-pad"
                onChangeText={e => this.setState({ninja: e})}
                maxLength={8}></TextInput>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={styles.buttonContainer}>
              <Button
                title="Ara"
                color="tomato"
                onPress={this.fetchGlobalAnalysis}
              />
            </View>
          </View>
          {this.state.stocks ? (
            <View style={{paddingTop: 20}}>
              <Table borderStyle={{borderColor: 'transparent'}}>
                <Row
                  data={['', 'RSI', 'NINJA', 'F/K']}
                  style={styles.head}
                  textStyle={styles.tableHeaderText}
                />
              </Table>
              {this.state.stocks.map(stock => {
                return (
                  <TouchableNativeFeedback
                    onPress={() => {
                      this.props.navigation.push('StockDetail', {
                        name: stock.name,
                      });
                    }}>
                    <View>
                      <TableWrapper style={styles.tableRow}>
                        <Cell data={stock.name} textStyle={styles.titleText} />
                        <Cell
                          data={stock.rsi.toFixed(2)}
                          textStyle={styles.defaultText}
                        />
                        <Cell
                          data={stock.ninja.toFixed(2)}
                          textStyle={styles.defaultText}
                        />
                        <Cell
                          data={stock.fk.toFixed(2)}
                          textStyle={styles.defaultText}
                        />
                      </TableWrapper>
                    </View>
                  </TouchableNativeFeedback>
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
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '75%',
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
    flex: 1,
    position: 'absolute',
    zIndex: 20,
    height: '100%',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
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
  tableHeaderText: {color: Colors.darkGray, textAlign: 'center'},
  tableRow: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderBottomWidth: 0.5,
  },
  titleText: {margin: 6, color: 'white', fontWeight: 'bold'},
  defaultText: {margin: 6, color: 'white', textAlign: 'center'},
});

export default StocksList;

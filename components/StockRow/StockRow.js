import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import {TableWrapper, Cell} from 'react-native-table-component';
import Swipeout from 'react-native-swipeout';

import Colors from '../../constants/colors';

const StockRow = props => {
  if (props.list) {
    var swipeoutBtns = [
      {
        text: 'Ekle',
        backgroundColor: 'green',
        color: 'white',
        type: 'add',
        onPress: () => props.addNewStock(props.stockName),
      },
    ];
  } else if (props.homepage) {
    var swipeoutBtns = [
      {
        text: 'Sil',
        backgroundColor: 'red',
        color: 'white',
        type: 'delete',
        onPress: () => props.delete(props.stockName),
      },
    ];
  }
  return (
    <>
      <Swipeout
        right={swipeoutBtns}
        backgroundColor={Colors.primary}
        autoClose={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!props.list) {
              props.navigation.push('StockDetail', {
                name: props.stockName,
                state: props.stock.rate < 0 ? 'decreasing' : 'increasing',
              });
            }
          }}>
          <View>
            <TableWrapper style={styles.row}>
              <Cell
                key={props.stockName}
                data={props.stockName}
                textStyle={styles.titleText}
              />
              <Cell
                key={props.stock.price}
                data={props.stock.price}
                textStyle={
                  props.stock.rate < 0
                    ? styles.decreasingText
                    : styles.increasingText
                }
              />
              <Cell
                key={props.stock.dayRange}
                data={props.stock.dayRange}
                textStyle={styles.defaultText}
              />
              <Cell
                key={props.stock.rate}
                data={['%', props.stock.rate]}
                textStyle={
                  props.stock.rate < 0
                    ? styles.decreasingText
                    : styles.increasingText
                }
              />
            </TableWrapper>
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {margin: 6, color: 'white', fontWeight: '600'},
  defaultText: {margin: 6, color: 'white', textAlign: 'center'},
  increasingText: {margin: 6, color: Colors.increase, textAlign: 'center'},
  decreasingText: {margin: 6, color: Colors.decrease, textAlign: 'center'},
  row: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderBottomWidth: 0.5,
  },
});

export default StockRow;

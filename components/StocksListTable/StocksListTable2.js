import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Table, Row } from "react-native-table-component";

import StockRow from "../StockRow/StockRow";
import Colors from "../../constants/colors";

const StocksListTable = props => {
  const _renderItem = ({ item, index }) => {
    return (
      <StockRow
        key={item}
        index={item}
        stockName={item}
        stock={props.stocks[item]}
        list={props.list}
      />
    );
  };
  const _keyExtractor = ({ item, index }) => item;
  return (
    <View>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row
          data={props.headers}
          style={styles.head}
          textStyle={styles.headerText}
        />
      </Table>
      <FlatList
        data={Object.keys(props.stocks)}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        initialNumToRender={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  head: {
    height: 25,
    backgroundColor: Colors.secondary
  },
  headerText: { color: Colors.darkGray, textAlign: "center" }
});

export default StocksListTable;

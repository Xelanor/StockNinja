import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { Table, Row } from "react-native-table-component";

import StockRow from "../StockRow/StockRow";
import Colors from "../../constants/colors";

const StocksListTable = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.refresh();
    setRefreshing(false);
  }, [refreshing]);
  return (
    <View>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row
          data={props.headers}
          style={styles.head}
          textStyle={styles.headerText}
        />
      </Table>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[Colors.increase]}
              tintColor={Colors.increase}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {Object.keys(props.stocks).map((stockName, index) => {
            return (
              <StockRow
                key={index}
                index={index}
                stockName={stockName}
                stock={props.stocks[stockName]}
                list={props.list}
                addNewStock={props.addNewStock}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
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

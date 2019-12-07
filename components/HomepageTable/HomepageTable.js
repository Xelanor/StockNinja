import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import StockRow from '../StockRow/StockRow';

import Colors from '../../constants/colors';

const HomepageTable = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.refresh();
    setRefreshing(false);
  }, [refreshing]);
  return (
    <View>
      <Table borderStyle={{borderColor: 'transparent'}}>
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
          }>
          {Object.keys(props.stocks)
            .sort()
            .map((stockName, index) => {
              return (
                <StockRow
                  key={index}
                  index={index}
                  stockName={stockName}
                  stock={props.stocks[stockName]}
                  homepage={true}
                  delete={props.delete}
                  navigation={props.navigation}
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
    flex: 1,
  },
  head: {
    height: 25,
    backgroundColor: Colors.secondary,
  },
  headerText: {color: Colors.darkGray, textAlign: 'center'},
});

export default HomepageTable;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

const TinyInfoBox = props => {
  return (
    <View style={styles.col}>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.infoText}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    color: '#c9cfd6',
    fontSize: 12,
    marginBottom: 2,
  },
  infoText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TinyInfoBox;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import Colors from '../../constants/colors';

const Header = props => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.header}>
        <StatusBar barStyle="dark-content" />
        <Image
          style={{
            height: 30,
            resizeMode: 'center',
          }}
          source={require('../../assets/logo2.png')}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;

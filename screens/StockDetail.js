import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import TinyInfoBox from '../components/InfoBoxes/TinyInfoBox';
import RsiGraph from '../components/Graphs/RsiGraph';
import ClosesGraph from '../components/Graphs/ClosesGraph';
import EnvGraph from '../components/Graphs/EnvGraph';
import NinjaGraph from '../components/Graphs/NinjaGraph';
import Colors from '../constants/colors';

rateCalculator = (price, prevClose) => {
  const rate = (((price - prevClose) / prevClose) * 100).toFixed(2);
  return rate;
};

class StockDetail extends Component {
  state = {
    data: null,
    loading: false,
    targets: {},
    duration: 30,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({loading: true});
    const stock = this.props.navigation.getParam('name');
    axios
      .get(
        'https://2akmvtjm73.execute-api.us-east-1.amazonaws.com/default/rsi_index_calculator?stock=' +
          stock,
      )
      .then(res => {
        const data = res.data;
        let targets = {};
        targets = {
          buyTarget: data.buyTarget.toString(),
          sellTarget: data.sellTarget.toString(),
          cloneBuyTarget: data.buyTarget.toString(),
          cloneSellTarget: data.sellTarget.toString(),
          prevBuyTarget: data.prevBuyTarget.toString(),
          prevSellTarget: data.prevSellTarget.toString(),
        };
        this.setState({data, targets});
      })
      .catch(err => console.error(err));
    this.setState({loading: false});
  };

  onTargetChangeHandler = (inputText, stockName, targetType) => {
    let targets = {...this.state.targets};
    targets[targetType] = inputText;
    this.setState({
      targets,
    });
  };

  setBuyTarget = async stockName => {
    this.setState({loading: true});
    let target = {
      name: stockName,
      target: this.state.targets.buyTarget,
      prevTarget: this.state.targets.cloneBuyTarget,
      state: true,
    };
    await axios
      .post('https://teknodeneyim.com/stocks/setbuytarget', target)
      .then(res => console.log('success'))
      .catch(err => {
        console.log(err);
      });
    this.getData();
    this.setState({
      loading: false,
    });
  };

  setSellTarget = async stockName => {
    this.setState({loading: true});
    let target = {
      name: stockName,
      target: this.state.targets.sellTarget,
      prevTarget: this.state.targets.cloneSellTarget,
      state: true,
    };
    await axios
      .post('https://teknodeneyim.com/stocks/setselltarget', target)
      .then(res => console.log('success'))
      .catch(err => {
        console.log(err);
      });
    this.setState({
      loading: false,
    });
    this.getData();
  };

  render() {
    if (!this.state.data || this.state.loading) {
      return (
        <View style={[styles.container, styles.loading]}>
          <ActivityIndicator size="large" color="#03AC83" />
        </View>
      );
    }
    const {data, targets} = this.state;
    const rate = rateCalculator(
      parseFloat(data.price),
      parseFloat(data.prevClose),
    );
    const state = this.props.navigation.getParam('state');
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.screen}>
            <View
              style={[
                styles.summary,
                {
                  backgroundColor:
                    state === 'increasing' ? '#03AC83' : '#F45959',
                },
              ]}>
              <View style={styles.summaryRow}>
                <TinyInfoBox title="Fiyat" value={data.price} />
                <TinyInfoBox title="Düşük-Yüksek" value={data.dayRange} />
                <TinyInfoBox title="Fark" value={['% ', rate]} />
              </View>
            </View>
            <View style={styles.row}>
              <TinyInfoBox title="52w High" value={data['52wHigh']} />
              <TinyInfoBox title="52w Low" value={data['52wLow']} />
              <TinyInfoBox title="Volume" value={data.volume} />
              <TinyInfoBox title="Dünün Kapanışı" value={data.prevClose} />
            </View>
            <View style={styles.targetRow}>
              <View style={styles.col}>
                <Text style={styles.titleText}>
                  Eski hedef: {targets.prevBuyTarget}
                </Text>
                <Text style={styles.infoText}>Buy Target</Text>
                <TextInput
                  style={styles.input}
                  value={targets.buyTarget}
                  keyboardType="decimal-pad"
                  onChangeText={e =>
                    this.onTargetChangeHandler(e, data.name, 'buyTarget')
                  }
                  maxLength={8}
                />
                <View style={styles.button}>
                  <Button
                    title="Gönder"
                    onPress={() => {
                      this.setBuyTarget(data.name);
                    }}
                    color="green"></Button>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.titleText}>
                  Eski hedef: {targets.prevSellTarget}
                </Text>
                <Text style={styles.infoText}>Sell Target</Text>
                <TextInput
                  style={styles.input}
                  value={targets.sellTarget}
                  keyboardType="decimal-pad"
                  onChangeText={e =>
                    this.onTargetChangeHandler(e, data.name, 'sellTarget')
                  }
                  maxLength={8}
                />
                <View style={styles.button}>
                  <Button
                    title="Gönder"
                    onPress={() => {
                      this.setSellTarget(data.name);
                    }}
                    color="green"></Button>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.headerContainer,
                {justifyContent: 'space-around'},
              ]}>
              <Button
                title="1 aylık"
                onPress={() => {
                  this.setState({duration: 30});
                }}
                color={'tomato'}
              />
              <Button
                title="2 aylık"
                onPress={() => {
                  this.setState({duration: 60});
                }}
                color={'orange'}
              />
              <Button
                title="3 aylık"
                onPress={() => {
                  this.setState({duration: 90});
                }}
                color={'red'}
              />
            </View>
            {this.state.data.rsi.length > 0 ? (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>RSI Index</Text>
                </View>
                <RsiGraph
                  data={this.state.data.rsi}
                  duration={this.state.duration}
                />
              </>
            ) : (
              <View />
            )}
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                Son {this.state.duration} günün kapanışları
              </Text>
            </View>
            <ClosesGraph
              data={this.state.data.closes}
              duration={this.state.duration}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Env Index</Text>
            </View>
            <EnvGraph
              data={this.state.data.env}
              closes={this.state.data.closes}
              duration={this.state.duration}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Ninja Index</Text>
            </View>
            <NinjaGraph
              data={this.state.data.ninja_index}
              duration={this.state.duration}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Ninja Index 2</Text>
            </View>
            <NinjaGraph
              data={this.state.data.ninja_index_s}
              duration={this.state.duration}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingBottom: 20,
  },
  summary: {
    paddingTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    height: 65,
  },
  summaryRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
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
  titleText: {
    color: Colors.darkGray,
    fontSize: 12,
  },
  infoText: {
    color: 'white',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  input: {
    width: 90,
    textAlign: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
  },
  button: {
    paddingTop: 5,
  },
});

export default StockDetail;

import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import RsiGraph from "../Graphs/RsiGraph";
import Colors from "../../constants/colors";

const StockDetail = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.titleText}>52w High</Text>
          <Text style={styles.infoText}>{props.stock["52wHigh"]}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>52w Low</Text>
          <Text style={styles.infoText}>{props.stock["52wLow"]}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>Volume</Text>
          <Text style={styles.infoText}>{props.stock.volume}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>Dünün Kapanışı</Text>
          <Text style={styles.infoText}>{props.stock.prevClose}</Text>
        </View>
      </View>
      <RsiGraph data={props.graphData} />
      <View style={styles.targetRow}>
        <View style={styles.col}>
          <Text style={styles.titleText}>
            Eski hedef: {props.targets[props.stockName].prevBuyTarget}
          </Text>
          <Text style={styles.infoText}>Buy Target</Text>
          <TextInput
            style={styles.input}
            value={props.targets[props.stockName].buyTarget}
            keyboardType="decimal-pad"
            onChangeText={e =>
              props.targetChange(e, props.stockName, "buyTarget")
            }
            maxLength={8}
          />
          <View style={styles.button}>
            <Button
              title="Gönder"
              onPress={() => {
                props.setBuyTarget(props.stockName);
              }}
              color="green"
            ></Button>
          </View>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>
            Eski hedef: {props.targets[props.stockName].prevSellTarget}
          </Text>
          <Text style={styles.infoText}>Sell Target</Text>
          <TextInput
            style={styles.input}
            value={props.targets[props.stockName].sellTarget}
            keyboardType="decimal-pad"
            onChangeText={e =>
              props.targetChange(e, props.stockName, "sellTarget")
            }
            maxLength={8}
          />
          <View style={styles.button}>
            <Button
              title="Gönder"
              onPress={() => {
                props.setSellTarget(props.stockName);
              }}
              color="green"
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  titleText: {
    color: Colors.darkGray,
    fontSize: 12
  },
  infoText: {
    color: "white"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  col: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  targetRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20
  },
  input: {
    width: 90,
    textAlign: "center",
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white"
  },
  button: {
    paddingTop: 5
  }
});

export default StockDetail;

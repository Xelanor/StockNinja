import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import StocksListTable from "../components/StocksListTable/StocksListTable";
import Colors from "../constants/colors";

class StocksList extends Component {
  state = {
    stocks: null,
    tableHead: ["", "Fiyat", "Düşük-Yüksek", "Fark"]
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(
        "https://hpnomowzxh.execute-api.us-east-1.amazonaws.com/default/fetch_all_stocks"
      )
      .then(res => {
        console.log("mounted");
        this.setState({ stocks: res.data });
      })
      .catch(err => console.error(err));
  };

  addNewStock = name => {
    axios
      .post("https://teknodeneyim.com/stocks/add", { name })
      .then(res => {})
      .catch(err => console.error(err));
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          {this.state.stocks ? (
            <StocksListTable
              stocks={this.state.stocks}
              headers={this.state.tableHead}
              refresh={this.getData}
              list={true}
              addNewStock={this.addNewStock}
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
    backgroundColor: Colors.dark
  },
  loading: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    flex: 1,
    position: "absolute",
    zIndex: 20,
    height: "100%",
    width: "100%"
  }
});

export default StocksList;

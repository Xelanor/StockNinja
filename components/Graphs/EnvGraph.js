import React from 'react';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';

class RsiGraph extends React.PureComponent {
  render() {
    const data1 = this.props.closes.slice(-1 * this.props.duration);
    const data2 = this.props.data.upper.slice(-1 * this.props.duration);
    const data3 = this.props.data.lower.slice(-1 * this.props.duration);
    const contentInset = {top: 20, bottom: 20};

    const data = [
      {
        data: data1,
        svg: {stroke: 'rgb(134, 65, 244)'},
      },
      {
        data: data2,
        svg: {stroke: 'green'},
      },
      {
        data: data3,
        svg: {stroke: 'green'},
      },
    ];

    return (
      <View style={{height: 200, flexDirection: 'row', paddingLeft: 10}}>
        <YAxis
          data={data1}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
        />
        <LineChart
          style={{flex: 1, marginHorizontal: 16}}
          data={data}
          svg={{strokeWidth: 2, stroke: 'rgb(134, 65, 244)'}}
          contentInset={contentInset}>
          <Grid />
        </LineChart>
      </View>
    );
  }
}

export default RsiGraph;

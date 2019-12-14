import React from 'react';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';

class RsiGraph extends React.PureComponent {
  render() {
    const data1 = this.props.data.slice(-1 * this.props.duration);
    const data2 = Array(this.props.duration).fill(80);
    const data3 = Array(this.props.duration).fill(20);
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
          data={[0, 100]}
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
          contentInset={contentInset}
          yMax={100}
          yMin={0}>
          <Grid svg={{strokeWidth: 1, stroke: 'rgba(194, 79, 61, 0.70)'}} />
        </LineChart>
      </View>
    );
  }
}

export default RsiGraph;

import React from 'react';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';

class RsiGraph extends React.PureComponent {
  render() {
    const data1 = this.props.data.first_list.slice(-1 * this.props.duration);
    const data2 = this.props.data.second_list.slice(-1 * this.props.duration);
    const data3 = this.props.data.third_list.slice(-1 * this.props.duration);
    const closes = this.props.closes.slice(-1 * this.props.duration);
    const contentInset = {top: 20, bottom: 20};

    const data = [
      {
        data: data1,
        svg: {stroke: 'red'},
      },
      {
        data: data2,
        svg: {stroke: 'orange'},
      },
      {
        data: data3,
        svg: {stroke: 'green'},
      },
      {
        data: closes,
        svg: {stroke: 'rgb(134, 65, 244)'},
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
          <Grid svg={{strokeWidth: 1, stroke: 'rgba(194, 79, 61, 0.40)'}} />
        </LineChart>
      </View>
    );
  }
}

export default RsiGraph;

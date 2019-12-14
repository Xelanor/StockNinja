import React from 'react';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';
import {Circle} from 'react-native-svg';

class RsiGraph extends React.PureComponent {
  render() {
    let data1, data2;
    if (this.props.data.length > 200) {
      data1 = this.props.data;
      data2 = Array(data1.length).fill(0);
    } else {
      data1 = this.props.data.slice(-1 * this.props.duration);
      data2 = Array(this.props.duration).fill(0);
    }

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
    ];

    const Decorator = ({x, y, data}) => {
      return data1.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          onPress={() => alert(value)}
          r={2}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}></Circle>
      ));
    };

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
          yAccessor={({item}) => item}
          data={data}
          svg={{strokeWidth: 2, stroke: 'rgb(134, 65, 244)'}}
          contentInset={contentInset}>
          <Grid svg={{strokeWidth: 1, stroke: 'rgba(194, 79, 61, 0.70)'}} />
          <Decorator />
        </LineChart>
      </View>
    );
  }
}

export default RsiGraph;

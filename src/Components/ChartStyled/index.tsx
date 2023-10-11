import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeightChart = ({ labels, weights }: { labels: string[]; weights: number[] }) => {
  const chartConfig = {
    backgroundGradientFrom: "rgb(192, 77, 226)",
    backgroundGradientTo: "rgb(52, 12, 127)",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <LineChart
        data={{
          labels,
          datasets: [{ data: weights }],
        }}
        width={Dimensions.get("window").width - 50}
        height={220}
        yAxisSuffix="Kg"
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WeightChart;

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
  Plugin,
  ChartData,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface RadarChartProps {
    data: ChartData<'radar'>;
    options?: ChartOptions<'radar'>;
    plugins?: Plugin[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data, options, plugins }) => {

    const defaultOptions: ChartOptions<'radar'> = {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10, // Ajustez l'incrément des valeurs sur l'axe radial
                },
            },
        },
        elements: {
            line: {
                borderWidth: 3,
            },
        },
    };

    const combinedOptions = { ...defaultOptions, ...options };
    
  return <Radar className='w-full' data={data} options={combinedOptions} plugins={plugins} />;
};

export default RadarChart;
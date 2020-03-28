import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell } from 'recharts';

export interface Props { }


const SizeChart: React.FC<Props> = props => {
    const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [activeIndex, SetActiveIndex] = useState(0);

    const handleClick = (data: any, index: any) => {
        SetActiveIndex(index)
    }
    return (
        <>
            <PieChart width={400} height={300}>
                <Pie
                    onClick={handleClick}
                    dataKey='value'
                    isAnimationActive={false} data={data} cx={200} cy={200} innerRadius={40} outerRadius={60} fill="#8884d8" label
                >
                    {
                        data.map((entry, index) => <Cell fill={index === activeIndex ? '#82ca9d' : COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        </>
    );
}


export default SizeChart;
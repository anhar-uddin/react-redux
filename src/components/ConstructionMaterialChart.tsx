import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis } from 'recharts';



export interface Props { }

const ConstructionMaterialChart: React.FC<Props> = props => {


    let data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const handleClick = (data: any, index: any) => {
        console.log('data', data);
        console.log('index', index);
        SetActiveIndex(index)
    }

    useEffect(() => {


    }, []);

    const [activeIndex, SetActiveIndex] = useState(0);



    return (
        <>

            <BarChart width={400} height={300} data={data}>
                <XAxis dataKey="name" />
                <Bar dataKey='uv' onClick={handleClick}>
                    {
                        data.map((entry: any, index: any) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                        ))
                    }
                </Bar>
            </BarChart>
        </>
    );
}


export default ConstructionMaterialChart;
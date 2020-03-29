import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts';



export interface Props { data: any }

const ConstructionMaterialChart: React.FC<Props> = props => {

    let data: any[] = [];

    const handleClick = (data: any, index: any) => {
        console.log('data', data);
        console.log('index', index);
        SetActiveIndex(index)
    }

    useEffect(() => {
        data = formatData(props.data);
        setBarData([...data])
    }, [props.data]);

    const formatData = (features: any) => {
        let formattedData: any[] = [];
        features.forEach((feature: any) => {
            let materialObj = formattedData.find(x => x.name === feature.properties.material);
            if (materialObj) {
                materialObj.amount++;
            } else {
                formattedData.push({ name: feature.properties.material, amount: 1 })
            }
        });
        return formattedData;
    }

    const [activeIndex, SetActiveIndex] = useState(null);
    const [barData, setBarData] = useState(data);

    return (
        <>
            <BarChart width={600} height={300} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey='amount' onClick={handleClick}>
                    {
                        barData.map((entry: any, index: any) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? 'white' : 'blue'} key={`cell-${index}`} />
                        ))
                    }
                </Bar>
            </BarChart>
        </>
    );
}


export default ConstructionMaterialChart;
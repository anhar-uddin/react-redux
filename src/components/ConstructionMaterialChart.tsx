import React, { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts';
import { useDispatch } from "react-redux";
import { setMaterial } from "../store/actions/data";



export interface Props { data: any }

const ConstructionMaterialChart: React.FC<Props> = props => {

    let data: any[] = [];
    const dispatch = useDispatch();
    const [activeIndex, SetActiveIndex] = useState(null);
    const [barData, setBarData] = useState(data);

    useEffect(() => {
        data = formatData(props.data);
        setBarData([...data])
    }, [props.data]);

    const handleClick = (data: any, index: any) => {
        let materialType = barData[index].name;
        dispatch(setMaterial(materialType))
    }

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

    return (
        <>
            <BarChart width={450} height={300} data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey='amount' onClick={handleClick}>
                    {
                        barData.map((entry: any, index: any) => (
                            <Cell cursor="pointer" fill={index === activeIndex ? '#4e73df' : '#4e73df'} key={`cell-${index}`} />
                        ))
                    }
                </Bar>
            </BarChart>
        </>
    );
}


export default ConstructionMaterialChart;
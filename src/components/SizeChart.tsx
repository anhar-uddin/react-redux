import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, PolarAngleAxis } from 'recharts';
import { connect, useDispatch } from "react-redux";
import { getDateAreaSize } from "../store/actions/data";

export interface Props { data: any }


const SizeChart: React.FC<Props> = props => {
    let data: any[] = [];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [activeIndex, SetActiveIndex] = useState(0);
    const [pieData, setPieData] = useState(data);
    const dispatch = useDispatch();

    const handleClick = (data: any, index: any) => {
        console.log('data', index);
        let feature = pieData[index];
        dispatch(getDateAreaSize(feature.minSize, feature.maxSize))
        SetActiveIndex(index)
    }

    useEffect(() => {
        data = formatData(props.data);
        console.log('data', data);

        setPieData([...data])
    }, [props.data]);

    const formatData = (features: any) => {
        let formattedData: any[] = [];
        features.forEach((feature: any) => {
            let featureArea: any = findArea(feature.properties.area_);
            let name = featureArea.minSize + ',' + featureArea.maxSize;
            let areaObj = formattedData.find(x => x.name === name);
            if (areaObj) {
                areaObj.value++;
            } else {
                formattedData.push({ name: name, value: 1, minSize: featureArea.minSize, maxSize: featureArea.maxSize })
            }
        });
        return formattedData;
    }

    const findArea = (area: number) => {
        if (area <= 50) {
            return { minSize: 0, maxSize: 50 }
        } else if (area <= 200) {
            return { minSize: 50, maxSize: 200 }
        } else if (area <= 526) {
            return { minSize: 200, maxSize: 526 }
        }
    }

    return (
        <>
            <PieChart width={400} height={400}>
                <Pie
                    onClick={handleClick}
                    dataKey='value'
                    isAnimationActive={false} data={pieData} cx={200} cy={200} innerRadius={40} outerRadius={60} fill="#8884d8" label
                >
                    {
                        pieData.map((entry, index) => <Cell cursor="pointer" key={`pie-cell-${index}`} fill={index === activeIndex ? '#82ca9d' : COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        </>
    );
}


export default SizeChart;
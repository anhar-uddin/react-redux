import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, PolarAngleAxis } from 'recharts';
import { connect, useDispatch } from "react-redux";
import { getDateAreaSize, setAreaSize } from "../store/actions/data";
import { AreaSize } from '../lib/types';

export interface Props { data: any }


const SizeChart: React.FC<Props> = props => {
    let data: any[] = [];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [activeIndex, SetActiveIndex] = useState(null);
    const [pieData, setPieData] = useState(data);
    const dispatch = useDispatch();

    const handleClick = (data: any, index: any) => {
        console.log('data', index);
        let feature = pieData[index];
        let areaSize: AreaSize = { minSize: feature.minSize, maxSize: feature.maxSize }
        dispatch(setAreaSize(areaSize))
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
            <div className="text-center">
                <PieChart width={525} height={300}>
                    <Pie
                        onClick={handleClick}
                        dataKey='value'
                        isAnimationActive={false} data={pieData} innerRadius={40} outerRadius={60} fill="#8884d8" label
                    >
                        {
                            pieData.map((entry, index) => <Cell cursor="pointer" key={`pie-cell-${index}`} fill={index === activeIndex ? 'black' : COLORS[index]} />)
                        }
                    </Pie>
                </PieChart>
                <div className="my-4 text-center small">
                    {pieData.map((entry, index) => <span style={{ color: COLORS[index] }} key={`pie-label-${index}`} className="mr-2">
                        <i className="fas fa-circle text-primary"></i> {entry.name}
                    </span>)
                    }
                    {/* <span className="mr-2">
                        <i className="fas fa-circle text-primary"></i> Direct
                    </span>
                    <span className="mr-2">
                        <i className="fas fa-circle text-success"></i> Social
                    </span>
                    <span className="mr-2">
                        <i className="fas fa-circle text-info"></i> Referral
                    </span> */}
                </div>
            </div>

        </>
    );
}


export default SizeChart;
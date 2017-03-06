import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function average(data) {
    return _.round(_.sum(data)/data.length);
}

export default (props) => {
    return ( 
        <div className="chartContainer">
            <div className="maxmin">
                <div className="max">{_.round(props.max)}</div>
                <div className="min">{_.round(props.min)}</div>
            </div>
            <div>
                <Sparklines height={75} width={150} data={props.data}>
                    <SparklinesLine color={props.color} />
                    <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <div>Average: {average(props.data)} {props.units}</div>
            </div>
        </div> 
    );
}
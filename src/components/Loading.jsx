import * as React from "react";
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
const SAMPLE_CSS = `
     #control-container {
        padding: 0px !important;
    }

    .linear-parent {
        text-align: center;
        width: 80%;
        margin: auto !important;
    }

    .progressbar-label {
        text-align: left;
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #3D3E3C;
        margin-left: 10px;
        padding: 0px;
        top: 10px;
    }

    #reLoad {
        border-radius: 4px;
        text-transform: capitalize;
    }
    `;
export default class Loading extends React.Component {
    linearFive;


    render() {
        return (<div>
            <style>
                {SAMPLE_CSS}
            </style>
            <div>
                <div>
                    <div>
                        <div>
                            <ProgressBarComponent trackThickness={6} progressThickness={6} id="linearactive" ref={linear5 => this.linearFive = linear5} type='Linear' value={100} isIndeterminate={true} isActive={true} animation={{
                                enable: true,
                                duration: 1000,
                                delay: 0,
                            }}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}
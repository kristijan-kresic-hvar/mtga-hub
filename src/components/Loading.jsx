import * as React from "react";
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { useStateContext } from "../contexts/ContextProvider";
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
const Loading = () => {
    let linearFive;

    const { currentMode } = useStateContext()

    return (<div>
        <style>
            {SAMPLE_CSS}
        </style>
        <div>
            <div>
                <div>
                    <div>
                        <ProgressBarComponent trackThickness={6} progressThickness={6} id="linearactive" ref={linear5 => linearFive = linear5} type='Linear' trackColor={`${currentMode === 'Dark' ? '#242424' : 'rgba(0,0,0,0.3)'}`} progressColor={`${currentMode === 'Dark' ? '#AB1E32' : '#3416DE'}`} value={100} isIndeterminate={true} isActive={true} animation={{
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

export default Loading
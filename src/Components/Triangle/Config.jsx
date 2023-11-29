import '../../css/basic.css';
import '../../css/calculate.css';



function Config(props) {

    return ( 
        <div className="Config">

            <div className="config-container component">
                <div className="config-bar">
                    <div className="values">
                        <p>Side 1: {props.values[0]}</p>
                        <p>Side 2: {props.values[1]}</p>
                        <p>Hypotenuse: {props.values[2]}</p>
                        <p>Angle 1: {props.values[3]}</p>
                        <p>Angle 2: {props.values[4]}</p>
                    </div>

                    <p className="config-info">
                        Created by Griffin
                        <br></br>
                        Made using React
                        <br></br>
                        Hosted on Vercel
                        <br></br>
                        Progressive Web App
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Config;
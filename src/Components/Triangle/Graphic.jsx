import '../../css/basic.css';
import { useRef, useEffect } from 'react';
import { trigonometry, pythagoreanTheorem } from './TriangleSolver.js'
import { preVerification, postVerification, getGraphicStatus } from './TriangleVerification.js'


let triangle = [0, 0, 0, 0, 0];



// [canvas] must be a side length of square
function normalizeLengths(side1, side2, canvas) {

    let normX = canvas / side2;
    let normY = canvas / side1;
    let ratio = Math.min(normX, normY);

    return [(ratio * side1), (ratio * side2)];
}



// Handle triangle solving
function calcData(side1, side2, hyp, angle1, angle2) {


    let newSide1 = side1 !== '' ? parseFloat(fastRnd(side1)) : 0.0;
    let newSide2 = side2 !== '' ? parseFloat(fastRnd(side2)) : 0.0;
    let newHyp = hyp !== '' ? parseFloat(fastRnd(hyp)) : 0.0;
    let newAngle1 = angle1 !== '' ? parseFloat(fastRnd(angle1)) : 0.0;
    let newAngle2 = angle2 !== '' ? parseFloat(fastRnd(angle2)) : 0.0;


    let e = pythagoreanTheorem(newSide1, newSide2, newHyp);
    newSide1 = e[0];
    newSide2 = e[1];
    newHyp = e[2];

    let j = trigonometry(newSide1, newSide2, newHyp, newAngle1, newAngle2);
    newSide1 = j[0];
    newSide2 = j[1];
    newHyp = j[2];
    newAngle1 = j[3];
    newAngle2 = j[4];
    
    return [fastRnd(newSide1), fastRnd(newSide2), fastRnd(newHyp), fastRnd(newAngle1), fastRnd(newAngle2)]; // side1, side2, hyp, angle1, angle2
}


// Quickly round to 6 decimal places
function fastRnd(value) {
    return Math.round(value * 100000000000000) / 100000000000000;
}

const Graphic = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        let kWidth = props.width - 200;
        let kHeight = props.height - 200;


        let statusMessage = preVerification(
            props.side1 !== '' ? parseFloat(fastRnd(props.side1)) : '',
            props.side2 !== '' ? parseFloat(fastRnd(props.side2)) : '',
            props.hypotenuse !== '' ? parseFloat(fastRnd(props.hypotenuse)) : '',
            props.angle1 !== '' ? parseFloat(fastRnd(props.angle1)) : '',
            props.angle2 !== '' ? parseFloat(fastRnd(props.angle2)) : ''
        );

        triangle = calcData(props.side1, props.side2, props.hypotenuse, props.angle1, props.angle2);

        let postVerificationError = postVerification(
            props.side1 !== '' ? parseFloat(fastRnd(props.side1)) : '',
            props.side2 !== '' ? parseFloat(fastRnd(props.side2)) : '',
            props.hypotenuse !== '' ? parseFloat(fastRnd(props.hypotenuse)) : '',
            props.angle1 !== '' ? parseFloat(fastRnd(props.angle1)) : '',
            props.angle2 !== '' ? parseFloat(fastRnd(props.angle2)) : '',
            triangle[0],
            triangle[1],
            triangle[2],
            triangle[3],
            triangle[4]
        );

        props.onUpdate(triangle);


        let graphicStatus = getGraphicStatus();

        console.log("Status: " + graphicStatus);

        if (postVerificationError && graphicStatus !== "absent") {
            graphicStatus = "error";
        }


        if (graphicStatus === "display") {

            let normSideLengths = normalizeLengths(triangle[0], triangle[1], kWidth);
            let verticalPoint = (props.height - normSideLengths[0]) / 2;
            let horizontalPoint = (props.width - normSideLengths[1]) / 2;


            context.beginPath();
            context.moveTo(horizontalPoint, verticalPoint);


            context.lineTo(horizontalPoint, verticalPoint + normSideLengths[0]);
            context.lineTo(horizontalPoint + normSideLengths[1], verticalPoint + normSideLengths[0]);
            context.lineTo(horizontalPoint, verticalPoint);


            context.strokeStyle = 'black'; // Set the line color
            context.lineWidth = 2; // Set the line width
            context.stroke(); // Draw the lines


            // Draw Text
            context.font = "15px Arial";
            context.fillStyle = 'black';

            context.fillText(Math.round(triangle[0] * 100) / 100, (horizontalPoint - 60), (props.height / 2)); // Side 1
            context.fillText(Math.round(triangle[1] * 100) / 100, (props.width / 2 - 20), (verticalPoint + normSideLengths[0] + 60)); // Side 2
            context.fillText(Math.round(triangle[2] * 100) / 100, (horizontalPoint + normSideLengths[1] * 0.6), (verticalPoint + normSideLengths[0] * 0.4 - 10)); // Hypotenuse

            context.fillText(Math.round(triangle[3] * 10) / 10 + "°", (horizontalPoint - 30), (verticalPoint - 30));
            context.fillText(Math.round(triangle[4] * 10) / 10 + "°", (horizontalPoint + normSideLengths[1] + 30), (verticalPoint + normSideLengths[0] + 30));

        } else if (graphicStatus === "error") {

            context.font = "15px Arial";
            context.fillStyle = 'black';
            context.fillText("Unable to display triangle. Please fix the following errors.", 30, 30, props.width - 20);

            let validErrors = [];
            for (let i = 0; i < statusMessage.length; i++) {
                for (let j = 0; j < statusMessage[i].length; j++) {
                    validErrors.push(statusMessage[i][j]);
                }
            }

            if (postVerificationError && validErrors == '') {
                validErrors.push("The entered values do not make a right triangle.");
            }

            context.fillStyle = 'red'
            for (let e = 0; e < validErrors.length; e++) {
                let yVal = 50 + 20 * (e + 1);
                context.fillText(validErrors[e], 30, yVal, props.width - 20);
            }
            
        } else if (graphicStatus === "absent") {

            context.font = "20px Arial";
            context.fillStyle = 'black';
            context.fillText("Enter at least 2 values to begin.", 110, 30, props.width - 20);
            context.fillText("1 input must be a valid side length.", 95, 60, props.width - 20);


            context.beginPath();
            context.moveTo(100, 120);

            context.lineTo(100, 420);
            context.lineTo(400, 420);
            context.lineTo(100, 120);

            context.strokeStyle = 'black'; // Set the line color
            context.lineWidth = 2; // Set the line width
            context.stroke(); // Draw the lines

            // Draw Text
            context.font = "15px Arial";
            context.fillStyle = 'black';

            context.fillText("Side 1", 20, 270); // Side 1
            context.fillText("Side 2", 220, 470); // Side 2
            context.fillText("Hypotenuse", 280, 240); // Hypotenuse

            context.fillText("Angle 1", 50, 100);
            context.fillText("Angle 2", 410, 450);
        }
        

    }, [props.side1, props.side2, props.hypotenuse, props.angle1, props.angle2]);



    return (
        <canvas ref={canvasRef} width={props.width} height={props.height} />
    );
}

export default Graphic;
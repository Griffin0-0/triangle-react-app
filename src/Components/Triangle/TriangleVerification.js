import { convertDtr, convertRtd } from "./TriangleSolver.js"

let graphicStatus = "absent"; // absent, error, display


function errorOffset(value, value2) {
    if ((Math.round(value * 10) / 10) === (Math.round(value2 * 10) / 10)) {
        return true;
    } else if (Math.abs(value - value2) <= 1) {
        console.log(Math.abs(value - value2));
        return true;
    } else {
        return false;
    }
}


export function preVerification(side1, side2, hyp, angle1, angle2) {
    let validInputs = 0;
    let statusMessage = [[], [], [], [], []];

    // side1
    if (side1 !== '') {
        validInputs++

        if (!(side1 > 0) && !isNaN(side1)) {
            statusMessage[0].push("Side 1 must be above 0");
        }
        if (isNaN(side1)) {
            statusMessage[0].push("Side 1 must be a numerical value");
        }
        if (!(side1 < 10000000) && !isNaN(side1)) {
            statusMessage[0].push("Side 1 must be below 10 million");
        }
    }

    // side2
    if (side2 !== '') {
        validInputs++

        if (!(side2 > 0) && !isNaN(side2)) {
            statusMessage[1].push("Side 2 must be above 0");
        }
        if (isNaN(side2)) {
            statusMessage[1].push("Side 2 must be a numerical value");
        }
        if (!(side2 < 10000000) && !isNaN(side2)) {
            statusMessage[1].push("Side 2 must be below 10 million");
        }
    }

    // hypotenuse
    if (hyp !== '') {
        validInputs++

        if (!(hyp > 0) && !isNaN(hyp)) {
            statusMessage[2].push("Hypotenuse must be above 0");
        }
        if (isNaN(hyp)) {
            statusMessage[2].push("Hypotenuse must be a numerical value");
        }
        if (side1 !== '') {
            if (!(hyp > side1)) {
                statusMessage[2].push("Hypotenuse must be larger than side 1");
            }
        }
        if (side2 !== '') {
            if (!(hyp > side2)) {
                statusMessage[2].push("Hypotenuse must be larger than side 2");
            }
        }
        if (side1 !== '' && side2 !== '') {
            if (!errorOffset((side1**2 + side2**2), hyp**2)) {
                statusMessage[2].push("Hypotenuse must follow Pythagorean's Theorem")
            }
        }
        if (!(hyp < 10000000) && !isNaN(hyp)) {
            statusMessage[2].push("Hypotenuse must be below 10 million");
        }
    }

    // angle1
    if (angle1 !== '') {
        validInputs++

        if (!(angle1 > 0) && !isNaN(angle1)) {
            statusMessage[3].push("Angle 1 must be above 0 degrees");
        }
        if (!(angle1 < 89.999)) {
            statusMessage[3].push("Angle 1 must be below 90 degrees");
        }
        if (isNaN(angle1)) {
            statusMessage[3].push("Angle 1 must be a numerical value");
        }
        if (angle2 !== '') {
            if (!((angle1 + angle2) === 90)) {
                statusMessage[3].push("The sum of angle 1 and angle 2 must equal 90 degrees");
            }
        }
    }

    // angle2
    if (angle2 !== '') {
        validInputs++

        if (!(angle2 > 0) && !isNaN(angle2)) {
            statusMessage[4].push("Angle 2 must be above 0 degrees");
        }
        if (!(angle2 < 89.999)) {
            statusMessage[4].push("Angle 2 must be below 90 degrees");
        }
        if (isNaN(angle2)) {
            statusMessage[4].push("Angle 2 must be a numerical value");
        }
    }


    // no sides entered
    if (!checkValid(side1) && !checkValid(side2) && !checkValid(hyp)) {
        statusMessage[4].push("Cannot calculate without a valid side length");
    }


    if (validInputs < 2) {

        graphicStatus = "absent";

    } else if (!statusMessage.every(e => e.length === 0)) {

        graphicStatus = "error";

    } else {

        graphicStatus = "display";

    }

    return statusMessage;
}




export function postVerification(side1, side2, hyp, angle1, angle2, calcSide1, calcSide2, calcHyp, calcAngle1, calcAngle2) {

    console.log(side1, side2, hyp, angle1, angle2, "Calculated: ", calcSide1, calcSide2, calcHyp, calcAngle1, calcAngle2);

    if (checkValid(side1)) {
        if (side1 !== calcSide1) {
            return true;
        }
    }
    if (checkValid(side2)) {
        if (side2 !== calcSide2) {
            return true;
        }
    }
    if (checkValid(hyp)) {
        if (hyp !== calcHyp) {
            return true;
        }
    }
    if (checkValid(angle1)) {
        if (angle1 !== calcAngle1) {
            return true;
        }
    }
    if (checkValid(angle2)) {
        if (angle2 !== calcAngle2) {
            return true;
        }
    }



    if (!errorOffset((calcSide1**2 + calcSide2**2), calcHyp**2)) {
        console.log("bad");
        return true;
    }
    if (!errorOffset((calcAngle1 + calcAngle2), 90)) {
        console.log("bad2");
        return true;
    }

    // check angle1
    if (checkValid(side1) && checkValid(side2)) {
        if (!errorOffset(convertRtd(Math.atan(side2 / side1)), calcAngle1)) {
            console.log("horrible1");
            return true;
        }
    }
    if (checkValid(side2) && checkValid(hyp)) {
        if (!errorOffset(convertRtd(Math.asin(side2 / hyp)), calcAngle1)) {
            console.log("horrible2");
            return true;
        }
    }
    if (checkValid(side1) && checkValid(hyp)) {
        if (!errorOffset(convertRtd(Math.acos(side1 / hyp)), calcAngle1)) {
            console.log("horrible3");
            return true;
        }
    }

    // check angle2
    if (checkValid(side1) && checkValid(side2)) {
        if (!errorOffset(convertRtd(Math.atan(side1 / side2)), calcAngle2)) {
            console.log("horrible4");
            return true;
        }
    }
    if (checkValid(side1) && checkValid(hyp)) {
        if (!errorOffset(convertRtd(Math.asin(side1 / hyp)), calcAngle2)) {
            console.log("horrible5");
            return true;
        }
    }
    if (checkValid(side2) && checkValid(hyp)) {
        if (!errorOffset(convertRtd(Math.acos(side2 / hyp)), calcAngle2)) {
            console.log("horrible6");
            return true;
        }
    }

    return false;
}

function countValidInputs(side1, side2, hyp, angle1, angle2) {
    let valid = 0;
    let list = [side1, side2, hyp, angle1, angle2];

    for (let i = 0; i < list.length; i++) {
        if (list[i] !== '') {
            valid++;
        }
    }

    return valid;
}

function checkValid(query) {
    return query !== '' ? true : false;
}

export function getGraphicStatus() {
    return graphicStatus;
}
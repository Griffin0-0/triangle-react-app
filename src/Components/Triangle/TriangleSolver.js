let prevValues = [];


export function convertRtd(angle) {
    return parseFloat(angle * 180 / Math.PI);
}

export function convertDtr(angle) {
    return parseFloat(angle * Math.PI / 180);
}


// Calculate the missing value using pythagorean's theorem
export function pythagoreanTheorem(side1, side2, hyp) {
    let newSide1 = side1;
    let newSide2 = side2;
    let newHyp = hyp;


    // Unknown Hypotenuse
    if (side1 !== 0 && side2 !== 0) {
        newHyp = Math.sqrt(side1**2 + side2**2);
    }
    // Unknown side 1
    if (side2 !== 0 && hyp !== 0) {
        newSide1 = Math.sqrt(hyp**2 - side2**2);
    }
    // Unknown side 2
    if (side1 !== 0 && hyp !== 0) {
        newSide2 = Math.sqrt(hyp**2 - side1**2);
    }

    return [newSide1, newSide2, newHyp];
}

// Handle trigonometric calculations
export function trigonometry(side1, side2, hyp, angle1, angle2, validInputs) {
    let values = [side1, side2, hyp, angle1, angle2];



    if (side1 === 0) {
        if (hyp !== 0 && angle1 !== 0) {
            values[0] = hyp * Math.cos(convertDtr(angle1));
        }
        if (hyp !== 0 && angle2 !== 0) {
            values[0] = hyp * Math.sin(convertDtr(angle2));
        }
        if (side2 !== 0 && angle1 !== 0) {
            values[0] = side2 / Math.tan(convertDtr(angle1));
        }
        if (side2 !== 0 && angle2 !== 0) {
            values[0] = side2 * Math.tan(convertDtr(angle2));
        }
    }

    if (side2 === 0) {
        if (hyp !== 0 && angle1 !== 0) {
            values[1] = hyp * Math.sin(convertDtr(angle1));
        }
        if (hyp !== 0 && angle2 !== 0) {
            values[1] = hyp * Math.cos(convertDtr(angle2));
        }
        if (side1 !== 0 && angle1 !== 0) {
            values[1] = side1 * Math.tan(convertDtr(angle1));
        }
        if (side1 !== 0 && angle2 !== 0) {
            values[1] = side1 / Math.tan(convertDtr(angle2));
        }
    }

    if (hyp === 0) {
        if (side1 !== 0 && angle1 !== 0) {
            values[2] = side1 / Math.cos(convertDtr(angle1));
        }
        if (side1 !== 0 && angle2 !== 0) {
            values[2] = side1 / Math.sin(convertDtr(angle2));
        }
        if (side2 !== 0 && angle1 !== 0) {
            values[2] = side2 / Math.sin(convertDtr(angle1));
        }
        if (side2 !== 0 && angle2 !== 0) {
            values[2] = side2 / Math.cos(convertDtr(angle2));
        }
    }

    if (angle1 === 0) {
        if (angle2 !== 0) {
            values[3] = 90 - angle2;
        }
        if (side1 !== 0 && side2 !== 0) {
            values[3] = convertRtd(Math.atan(side2 / side1));
        }
        if (side1 !== 0 && hyp !== 0) {
            values[3] = convertRtd(Math.acos(side1 / hyp));
        }
        if (side2 !== 0 && hyp !== 0) {
            values[3] = convertRtd(Math.asin(side2 / hyp));
        }
    }

    if (angle2 === 0) {
        if (angle1 !== 0) {
            values[4] = 90 - angle1;
        }
        if (side1 !== 0 && side2 !== 0) {
            values[4] = convertRtd(Math.atan(side1 / side2));
        }
        if (side2 !== 0 && hyp !== 0) {
            values[4] = convertRtd(Math.acos(side2 / hyp));
        }
        if (side1 !== 0 && hyp !== 0) {
            values[4] = convertRtd(Math.asin(side1 / hyp));
        }
    }

    return values;
}


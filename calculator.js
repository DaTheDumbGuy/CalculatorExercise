document.getElementById("fullscreenBtn").addEventListener("click", function () {
    var modal = document.querySelector("#calculator .modal-dialog");
    var sectionOne = document.querySelector("#sectionOne");
    var sectionTwo = document.querySelector("#sectionTwo");

    if (sectionOne.classList.contains("col-12")) {
        sectionOne.classList.remove("col-12");
        sectionOne.classList.add("col-8");
    } else {
        sectionOne.classList.remove("col-8");
        sectionOne.classList.add("col-12");
    }

    if (sectionTwo.classList.contains("d-none")) {
        sectionTwo.classList.remove("d-none");
        sectionTwo.classList.add("d-block");
    } else {
        sectionTwo.classList.remove("d-block");
        sectionTwo.classList.add("d-none");
    }

    modal.classList.toggle("modal-fullscreen");
    //Change the paddings of buttons
});



//num = num operator(Bug)
// Initialize variables
let calcStaged = document.getElementById("calcStaged");
let calcInput = document.getElementById("calcInput");
let reset = false;
let historyData = [];
let currentVal = ""; // current value
let operation = ""; // current operator
let stagedVal = ""; // staged value (i.e. the value being entered by the user)


// Handle calculator input
function input(value) {
    switch (value) {
        case "+":
        case "-":
        case "x":
        case "÷":
            // If an operation was already selected, calculate the result
            if (operation) {

                if (reset) {
                    // console.log("reset");
                    operation = value;
                    calcStaged.textContent = `${currentVal} ${operation} `;
                    break;
                }
                // } else if (currentVal == "0") {
                //     // currentVal = Number(calcInput.value);
                //     stagedVal = Number(calcInput.value);
                //     calcInput.value = calculate(currentVal, stagedVal, operation);
                //     currentVal = Number(calcInput.value);
                //     stagedVal = Number(calcInput.value);
                //     operation = value
                //     calcStaged.textContent = `${currentVal} ${operation} `;
                //     reset = true;
                //     break;
                // }
                stagedVal = Number(calcInput.value);
                calcInput.value = calculate(currentVal, stagedVal, operation);

                currentVal = Number(calcInput.value);
                operation = value;
                calcStaged.textContent = `${currentVal} ${operation}`;
                reset = true;


            } else {
                operation = value;
                reset = true;
                currentVal = Number(calcInput.value);
                calcStaged.textContent = `${currentVal} ${operation} `;
            }

            break;

        case "=":
            if (operation) {
                if (reset || operation == "=") {
                    operation = value;
                    calcStaged.textContent = `${calcInput.value} ${operation} `;
                    reset = true;
                    break;
                }
                stagedVal = Number(calcInput.value);
                calcInput.value = calculate(currentVal, stagedVal, operation);
                calcStaged.textContent = `${currentVal} ${operation} ${stagedVal} ${value}`;
                currentVal = calcInput.value;
                reset = true;
                operation = "";
            } else {
                operation = value;
                reset = true;
                currentVal = Number(calcInput.value);
                calcStaged.textContent = `${currentVal} ${operation} `;
            }
            break;

        case "CE":
            calcInput.value = "0";
            break;

        case "C":
            calcInput.value = "0";
            calcStaged.textContent = "";
            operation = "";
            currentVal = "";
            stagedVal = "";
            break;

        case "backspace":
            // calcInput.value = calcInput.value.slice(0, -1);
            calcInput.value = (calcInput.value.length == 1) ? "0" : calcInput.value.slice(0, -1);
            break;

        case "sqrt":
            currentVal = Math.sqrt(calcInput.value);
            calcStaged.textContent = `√${calcInput.value}`
            calcInput.value = currentVal;
            reset = true;
            // Math.sqrt(calcInput.value);
            break;

        case "sqr":
            currentVal = parseFloat(calcInput.value) ** 2;
            calcStaged.textContent = `sqr(${calcInput.value})`;
            calcInput.value = currentVal;
            reset = true;
            break;

        case "1/x":
            if (calcInput.value == "0") {
                calcInput.value = "Cannot devide by zero";
                reset = true;
            } else {
                calcStaged.textContent = `1/(${calcInput.value})`
                currentVal = 1 / parseFloat(calcInput.value);
                calcInput.value = currentVal;
                reset = true;
            }
            // calcInput.value = (calcInput.value == "0") ? "Cannot devide by zero" : 1 / parseFloat(calcInput.value);
            // calcInput.value = calcInput.value.slice(0, 0, "-");
            break;
        case "+/-":
            //bug fixed
            stagedVal = parseFloat(calcInput.value);
            if (stagedVal < 0) {
                stagedVal = stagedVal * -1;
                calcInput.value = stagedVal;

            } else {
                stagedVal = stagedVal * -1;
                calcInput.value = stagedVal;


            }

            break;
        case "MS":

            break;

        case "MR":


            break;

        case "M+":

            break;

        case "M-":

            break;

        case "%":
            // if (operation) {
            //     stagedVal = parseFloat(calcInput.value) % 0.    

            // }
            break;

        case ".":
            if (calcInput.value.includes(".")) {
                break;
            } else {
                calcInput.value += ".";
            }

            break;

        default:
            if (calcInput.value == "0" || reset == true) {
                calcInput.value = value
                reset = false;
            } else {
                calcInput.value += value;

            }
            break;
    }


}


// Calculate the result of two values given an operation
function calculate(val1, val2, op) {
    recordHistory(val1, val2, op);
    switch (op) {
        case "+":
            return val1 + val2;
        case "-":
            return val1 - val2;
        case "x":
            return val1 * val2;
        case "÷":
            return val1 / val2;
    }
}
//Do something about this shit -> Only the calculate function record history. 
function recordHistory(num1, num2, op) {
    let count = historyData.length;
    historyData[count] = {
        operand1: num1,
        operator2: op,
        operand2: num2
    }


}

//test history Data
function test() {
    console.log(historyData);
}
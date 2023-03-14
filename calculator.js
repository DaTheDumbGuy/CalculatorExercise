//For fullscreen, Adjust the design and spacing
document.getElementById("fullscreenBtn").addEventListener("click", function () {
    alert("FullScreen Feature is not done! Thank you for your Understanding!");
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
                    operation = value;
                    currentVal = Number(calcInput.value.replace(/,/g, ''));
                    calcStaged.textContent = `${currentVal} ${operation} `;
                    break;
                } else if (operation == "=") {
                    operation = value;
                    calcStaged.textContent = `${calcInput.value} ${operation}`;
                    break;
                }
                // calcInput.value = calcInput.value.replace(/,/g, '');
                stagedVal = Number(calcInput.value.replace(/,/g, ''));
                calcInput.value = calculate(currentVal, stagedVal, operation).toLocaleString('en-US');

                currentVal = Number(calcInput.value.replace(/,/g, ''));
                operation = value;
                calcStaged.textContent = `${currentVal} ${operation}`;
                reset = true;

            } else {
                operation = value;
                reset = true;
                currentVal = Number(calcInput.value.replace(/,/g, ''));
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
                stagedVal = Number(calcInput.value.replace(/,/g, ''));
                calcInput.value = calculate(currentVal, stagedVal, operation).toLocaleString('en-US');
                calcStaged.textContent = `${currentVal} ${operation} ${stagedVal} ${value}`;
                currentVal = calcInput.value;
                reset = true;
                operation = "";
            } else {
                operation = value;
                reset = true;
                currentVal = Number(calcInput.value.replace(/,/g, ''));
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
            if (calcInput.value.includes('.')) {
                calcInput.value = (calcInput.value.length == 1) ? "0" : calcInput.value.slice(0, -1);
            } else {
                calcInput.value = (calcInput.value.length == 1) ? "0" : calcInput.value.slice(0, -1);
                calcInput.value = calcInput.value.replace(/,/g, '');
                calcInput.value = parseFloat(calcInput.value).toLocaleString('en-US');
            }
            break;

        case "sqrt":
            currentVal = Math.sqrt(calcInput.value.replace(/,/g, ''));
            calcStaged.textContent = `√${calcInput.value.replace(/,/g, '')}`
            calcInput.value = parseFloat(currentVal).toLocaleString('en-US');
            reset = true;

            break;

        case "sqr":
            currentVal = parseFloat(calcInput.value.replace(/,/g, '')) ** 2;
            calcStaged.textContent = `sqr(${calcInput.value.replace(/,/g, '')})`;
            calcInput.value = parseFloat(currentVal).toLocaleString('en-US');

            reset = true;
            break;

        case "1/x":
            if (calcInput.value == "0") {
                calcInput.value = "Cannot devide by zero";
                reset = true;
            } else {
                calcStaged.textContent = `1/(${calcInput.value})`
                currentVal = 1 / parseFloat(calcInput.value.replace(/,/g, ''));
                calcInput.value = currentVal;
                reset = true;
            }

            break;
        case "+/-":

            stagedVal = parseFloat(calcInput.value.replace(/,/g, ''));
            if (stagedVal < 0) {
                stagedVal = stagedVal * -1;
                calcInput.value = stagedVal.toLocaleString('en-US');

            } else {
                stagedVal = stagedVal * -1;
                calcInput.value = stagedVal.toLocaleString('en-US');


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

            break;

        case ".":
            if (calcInput.value.includes('.')) {
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
                if (calcInput.value.length > 16) {
                    break;
                }
                if (calcInput.value.includes('.')) {
                    calcInput.value += value;
                } else {
                    calcInput.value += value;
                    calcInput.value = calcInput.value.replace(/,/g, '');
                    calcInput.value = parseFloat(calcInput.value).toLocaleString('en-US');
                }

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
//Do something about this shit -> Only the calculate function is being recorded in history. 
function recordHistory(num1, num2, op) {
    let count = historyData.length;
    historyData[count] = {
        operand1: num1,
        operator2: op,
        operand2: num2
    }


}

//Test history Data
function test() {
    console.log(historyData);
}

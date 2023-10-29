const display = document.querySelector(".displayText")
const btnContainer = document.querySelector(".buttonContainer");
const btnArray = ["AC", "+/-", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 
                1, 2, 3, "+", "del", 0, ".", "=" ]
const operators = ["/", "*", "-", "+"]

let num1 = null;
let num2 = null;
let operator = null;
let isNumFirst = true;

createButtons();
//create Buttons and their style
function createButtons(){
    for(let i=0;i<20;i++){
        const square = document.createElement("div");
        square.className = `btn${btnArray[i]}`;
        square.setAttribute("style", "display: flex;\
                            justify-content: center; align-items: center; \
                            background-color: hsl(182,59%,25%); \
                            height: 100.4px; width: 125px; \
                            font-size: 30px; color: white;");
        square.textContent = btnArray[i];
        square.addEventListener("mousedown", ()=>square.style.backgroundColor = "hsl(182,59%,30%)");
        square.addEventListener("mouseup", ()=>square.style.backgroundColor = "hsl(182,59%,25%)");
        
        displayText(square, i);
        
        btnContainer.appendChild(square);
    }  
}

function displayText(square, i){

    //display numbers
    if(square.textContent >= 0 && square.textContent <= 9){
        square.addEventListener("click", ()=>{
            if(num1 == null && num2 == null && operator == null){
                console.log(isNumFirst)
                if(isNumFirst){
                    display.textContent = btnArray[i];
                    num1 = display.textContent;
                    isNumFirst = false;
                } else if (!isNumFirst) {
                    display.textContent += btnArray[i];
                    num1 = display.textContent;
                }
                console.log(`num1: ${num1} num2: ${num2} operator: ${operator} isNumFirst: ${isNumFirst}`)

            } else if(num1 != null && operator != null) {
                if(isNumFirst){
                    display.textContent = btnArray[i];
                    num2 = display.textContent;
                    isNumFirst = false;
                } else if (!isNumFirst){
                    display.textContent += btnArray[i];
                    num2 = display.textContent;
                }
                console.log(`num1: ${num1} num2: ${num2} operator: ${operator} isNumFirst: ${isNumFirst}`)
            } else {
                if(isNumFirst){
                    display.textContent = btnArray[i];
                    num1 = display.textContent;
                    isNumFirst = false;
                } else {
                    display.textContent += btnArray[i];
                    num1 = display.textContent;
                }
                console.log(`num1: ${num1} num2: ${num2} operator: ${operator} isNumFirst: ${isNumFirst}`)
            }
            
            if(display.textContent == 0){
                display.textContent = 0;
                isNumFirst = true;
            }
        })
    }

    //0 button
    if(square.textContent == 0){
        square.addEventListener("click", ()=>{
            if(display.textContent == 0){
                display.textContent = 0;
                isNumFirst = true;
            }
        })
    }

    //Operators
    if(square.textContent == "+" || square.textContent == "-" ||
       square.textContent == "*" || square.textContent == "/"){
        square.addEventListener("click", ()=>{
            if(num1 != null && num2 == null && operator == null){
                
                display.textContent = 0;
                operator = square.textContent;
                isNumFirst = true;

            } else if (num1 != null && num2 != null && operator != null){
                display.textContent = operate(num1, operator, num2);
                
                num1 = display.textContent;
                num2 = null;
                operator = square.textContent;
                isNumFirst = true;
                
            } else if (num1 != null && num2 == null && operator != null){
                operator = square.textContent;
            }
            console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator} isNumFirst: ${isNumFirst}`)

        })
    }

    // equals button
    if(square.textContent == "="){
        square.addEventListener("click", ()=>{
            let result = operate(num1, operator, num2);
            if(String(result).includes("-")){
                display.textContent = String(result).substring(1,result.length) + "-"

            }else {
                display.textContent = result;
            }
            console.log(String(result).includes("-"))
            display.textContent = result;
            
            
            num1 = display.textContent
            num2 = null;
            operator = null;
            isNumFirst = true;
            console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator} isNumFirst: ${isNumFirst}`)
        })
    }

    //clear button
    if(square.textContent == "AC"){
        square.addEventListener("click", ()=>{
            display.textContent = 0;
            num1 = null;
            num2 = null;
            operator = null;
            isNumFirst = true;
        })
    }
    
    // delete button
    if(square.textContent == "del"){
        square.addEventListener("click", ()=>{
            console.log(display.textContent.length);

            if(num1 != null){
                if(display.textContent.length > 1){
                    display.textContent = display.textContent.substring(0, display.textContent.length-1)
                    num1 = display.textContent;
                } else {
                    display.textContent = 0;
                    num1 = 0;
                    isNumFirst = true;
                }
                console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator} isNumFirst: ${isNumFirst}`)

            }
        })
    }

    // percentage button
    if(square.textContent == "%"){
        square.addEventListener("click", ()=>{
            display.textContent = display.textContent / 100;
            if(num1 != null){
                num1 = display.textContent;
            } else if (num2 != null){
                num2 = display.textContent;
            }
            console.log(`num1: ${num1}, num2: ${num2}, operator: ${operator} isNumFirst: ${isNumFirst}`)

        })
    }
    //+/- button
    if(square.textContent == "+/-"){
        square.addEventListener("click", ()=>{
            if(!display.textContent.includes("-")){

                display.textContent = "-" + display.textContent
            } else if (display.textContent.includes("-")){
                display.textContent = display.textContent.substring(1, display.textContent.length)
            }
            
        })
    }
}

function operate(num1, operator, num2){
    if(operator == "+"){
        result = add(num1, num2)
        
        if(String(result).includes("-")){
            
            result =  String(result).substring(0, result.length-1);
            return result 
        }else {
            console.log(result)
            return result
        }
        
        
    } else if (operator == "-"){
        
        return subtract(num1, num2);
    } else if (operator == "*"){
        
        return multiply(num1, num2);
    } else {
        
        return divide(num1, num2);
    }
}

function add(num1, num2){
    return Number(num1) + Number(num2);
}

function multiply(num1, num2){
    return Number(num1) * Number(num2);
}

function subtract(num1, num2){
    return Number(num1) - Number(num2)
}

function divide(num1, num2){
    return Number(num1) / Number(num2);
}
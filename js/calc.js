const display1El = document.querySelector("#hist");
const display2El = document.querySelector("#output");
const tempResultEl = document.querySelector("#result1");
const numbersEl = document.querySelectorAll(".number");
const operatorEl = document.querySelectorAll(".operator");
const equalEl = document.querySelector(".equal");
const clearEl = document.querySelector("#clear");
const backspaceEl = document.querySelector("#backspace");

let display1Num = '';
let display2Num = '';
let result = '';
let lastOperator = '';
let haveDot = false;

//looping for numbers
numbersEl.forEach(number => { //use foreach loop methods
	number.addEventListener('click', (e) => {
		if (e.target.innerText === '.' && !haveDot) {
			haveDot = true;
		} else if (e.target.innerText === '.' && haveDot) {
			return;
		}
		display2Num += e.target.innerText;
		display2El.innerText = display2Num;
		// console.log(display2Num)
	})
});


// looping for operations
operatorEl.forEach(operation => {
	operation.addEventListener('click', (e) => {
		if (!display2Num) return;
		haveDot = false;
		const operationName = e.target.innerText;
		if (display1Num && display2Num && lastOperator) {
			mathOperation();
		} else {
			result = parseFloat(display2Num);
		}
		clearVal(operationName);
		lastOperator = operationName;
		// console.log(result)
	})
});

function clearVal(name = '') {
	display1Num += display2Num + ' ' + name + ' ';
	display1El.innerText = display1Num;
	display2El.innerText = '';
	display2Num = '';
	tempResultEl.innerText = result;
}

function mathOperation() {
	if (lastOperator === 'x') {
		result = parseFloat(result) * parseFloat(display2Num);
	}
	else if (lastOperator === '+') {
		result = parseFloat(result) + parseFloat(display2Num);
	}
	else if (lastOperator === '/') {
		result = parseFloat(result) / parseFloat(display2Num);
	}
	else if (lastOperator === '-') {
		result = parseFloat(result) - parseFloat(display2Num);
	}
	else if (lastOperator === '%') {
		result = parseFloat(result) % parseFloat(display2Num);
	}
};

equalEl.addEventListener('click', (e) => {
	if (!display1Num || !display2Num) return;
	haveDot = false;
	mathOperation();
	clearVal();
	display2El.innerText = result;
	tempResultEl.innerText = '';
	display2Num = result;
	display1Num = '';
});

clearEl.addEventListener('click', (e) => {
	display1El.innerText = '';
	display2El.innerText = '';
	display1Num = '';
	display2Num = '';
	result = '';
	tempResultEl.innerText = '';
})

backspaceEl.addEventListener('click', (e) => {
	display2El.innerText = '';
	display2Num = '';
});


// to use keyboard keys
window.addEventListener('keydown', (e) => {
	if(
		e.key === '0' ||
		e.key === '1' ||
		e.key === '2' ||
		e.key === '3' ||
		e.key === '4' ||
		e.key === '5' ||
		e.key === '6' ||
		e.key === '7' ||
		e.key === '8' ||
		e.key === '9' ||
		e.key === '.'
	){
		clickButtonEl(e.key);
	}
	else if(
		e.key === '+' ||
		e.key === '-' ||
		e.key === '/' ||
		e.key === '%'
	){
		clickOperation(e.key)
	}
	else if (	e.key === '*'){
		clickOperation('x');
	}
	else if (	e.key == 'Enter' || e.key == '='){
		clickEqual();
	}
});
function clickButtonEl(key){
	numbersEl.forEach(button =>{
		if(button.innerText === key){
			button.click();
		}
	})
};

function clickOperation(key){
	operatorEl.forEach(button => {
		if(button.innerText === key){
			button.click();
		}
	})
};

function clickEqual(key){
	equalEl.click();
}

// function getHistory(){
// 	return document.getElementById("hist-val").innerText; //get the value from html document
// }
// function displayHistory(num){
// 	document.getElementById("hist-val").innerText = num; //write the num value into html document
// }
// //displayHistory("777")
// function getOutput(){
// 	return document.getElementById("output-val").innerText;
// }

// function displayOutput(num){
// 	if(num == ""){
// 		document.getElementById("output-val").innerText= num;
// 	} 
// 	else{
// 		document.getElementById("output-val").innerText= formatNum(num);
// 	}

// }
// function formatNum(num){
// 	if(num ==""){
// 		return "";
// 	}
// 	var n = Number(num);
// 	var value = n.toLocaleString("en");
// 	return value;
// }
// //displayOutput("54535454");

// //to ficth the we change back to string
// function unFormatNum(num){
// 	var x = Number(num.replace(/,/g,''));
// 	return x;
// }
// //alert(unFormatNum(getOutput()));

// var operator = document.getElementsByClassName("operator");
// for(var i = 0; i < operator.length; i++){
// 	operator[i].addEventListener('click', function(e){
// 		//alert("the operator clicked: " + this.id);
// 		if(this.id =="clear"){
// 			displayHistory("");
// 			displayOutput("");
// 		}
// 		else if(this.id =="backspace"){
// 			var output = unFormatNum(getOutput()).toString();
// 			if(output){ //if output has a value
// 				output = output.substr(0,output.length-1);displayOutput(output);
// 			}
// 		}
// 		else{

// 			var output = getOutput();
// 			var history = getHistory();
// 			if(output==""&&history!=""){
// 				if(isNaN(history[history.length-1])){
// 					history=history.substr(0,history.length-1);
// 				}
// 			}
// 			if(output!="" || history!=""){
// 				//condition?true:false
// 				output=output==""? output:unFormatNum(output);
// 				history = history + output;
// 				if(this.id == "="){
// 					var result =eval(history);
// 					displayOutput(result);
// 					displayHistory("");
// 				}
// 				else{
// 					history=history+this.id;
// 					displayHistory(history);
// 					displayOutput("")
// 				}
// 			}
// 		}
// 	})
// }

// let number = document.getElementsByClassName("number");
// let numb1 = document.getElementsByClassName("num1");
// for( let i = 0; i < number.length; i++){
// 	number[i].addEventListener('click', function(){
// 		//alert("The number clicked: " + this.id);
// 		var output = unFormatNum(getOutput());
// 		// var output1 = unFormatNum(getOutput());
// 		// if(output!=NaN || output==="."){
// 			output += this.id;
// 			displayOutput(output);
// 		// }
// 	})
// }



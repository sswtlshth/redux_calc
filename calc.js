//action constants
 const ADD = 'ADD'
 const SUB = 'SUB'
 const MUL = 'MUL'
 const DIV = 'DIV'
 const EQUAL = 'EQUAL'
 const READ_OP1 = 'READ_OP1'
 const READ_OP2 = 'READ_OP2'
 const READ_OPERATOR = 'READ_OPERATOR'
 const CLEAR = 'CLEAR'
 const CLEARALL = 'CLEARALL'
 
//reducer
function calcReducer(state,action){
    if(typeof state === 'undefined'){
        return { result : 0,
            operator1: '',
            operator2: '',
            operator: '',
            readOperator: false}
    }
    var nextState = Object.assign({},state);
    console.log(nextState)
    switch(action.type){
        case READ_OP1 :
            nextState.operator1 = state.operator1 + action.value
            return nextState
            break
        case READ_OP2 :
            nextState.operator2 = state.operator2 + action.value
            return nextState
            break
        case READ_OPERATOR :
            nextState.readOperator = true;
            nextState.operator = action.operator;
            return nextState
            break
        case ADD :
            nextState.result = action.result
            nextState.operator1 = action.result
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case SUB :
            nextState.result = action.result
            nextState.operator1 = action.result
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case MUL :
            nextState.result = action.result
            nextState.operator1 = action.result
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case DIV :
            nextState.result = action.result
            nextState.operator1 = action.result
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case EQUAL :
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case CLEAR :
            nextState.operator1 = ''
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        case CLEARALL :
            nextState.result = ''
            nextState.operator1 = ''
            nextState.operator2 = ''
            nextState.operator = ''
            return nextState;
            break
        default : 
            return state
    }
}

var store = Redux.createStore(calcReducer)
const answerEle= document.getElementById('answer')
const operationEle= document.getElementById('operation')
console.log(store);
render()
store.subscribe(render)

function render(){
    console.log('in render');
    console.log('getState',store.getState());
    var state = store.getState();
    operationEle.innerHTML =state.operator1 + state.operator + state.operator2 
    answerEle.innerHTML = state.result
}

function readOperands(value){
    var state = store.getState();
    console.log('readOperatands', value);
    if(state.readOperator === false){
        store.dispatch({ type : 'READ_OP1', value});
    }else{
        store.dispatch({ type : 'READ_OP2', value});   
    }
}

function readOperators(operator){
    var state = store.getState();
    if(state.readOperator === true){
        let op1 = Number(state.operator1)
        let op2 = Number(state.operator2)
        let stateOperator = state.operator
        console.log('operator',operator)
        switch(stateOperator){
            case '+':
                store.dispatch(addOperator(op1,op2));
                break;
            case '-':
                store.dispatch(subOperator(op1,op2));
                break;
            case '*':
                store.dispatch(mulOperator(op1,op2));
                break;
            case '/':
                store.dispatch(divOperator(op1,op2));
                break;
            default: 
                console.log('Something went wrong')
        }
    }
    switch(operator){
        case '=':
                store.dispatch(equalOperator())
                break;
        case 'c':
                store.dispatch(clearOperator())
                break;
        case 'ca':
                store.dispatch(clearAllOperator())
                break;
        default : 
                store.dispatch(readOperator(operator)) 
                break
    }
}

function addOperator(op1,op2){
    return{
        type: ADD,
        result: op1+op2
    }
}

function subOperator(op1,op2){
    return{
        type: SUB,
        result: op1-op2
    }
}

function mulOperator(op1,op2){
    return{
        type: MUL,
        result: op1*op2
    }
}

function divOperator(op1,op2){
    return{
        type: DIV,
        result: op1/op2
    }
}
function equalOperator(op1,op2){
    return{
        type: EQUAL
    }
}
function clearOperator(op1,op2){
    return{
        type: CLEAR,
        result: op1/op2
    }
}
function clearAllOperator(op1,op2){
    return{
        type: CLEARALL,
        result: op1/op2
    }
}

function readOperator(operator){
    return{
        type : 'READ_OPERATOR',
        operator
    }
}



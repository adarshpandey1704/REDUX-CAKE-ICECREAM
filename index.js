const redux = require('redux')
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
// console.log('combineReducers', combineReducers);
// Action //customer
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"

// action creator is a function that returns an action

function buyCake(data) {
    return {
        type: BUY_CAKE,
        payload: {
            name: "adarsh",
            userId: 1
        }
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM
    }
}

// shopkeeper // reducer

// (prevState, action) => newState

const cakeState = {
    numOfCakes : 10
}

const iceCreamState = {
    numOfIceCreams: 20
}

const CakeReducer = ( state = cakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const IceCreamReducer = ( state = iceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    CakeReducer: CakeReducer,
    IceCreamReducer: IceCreamReducer
})

// shop store
// It will create a redux store instance for your application
const store = createStore(rootReducer);

console.log('Initial State', store.getState());
store.dispatch(buyCake());
console.log('Updated State', store.getState());
store.dispatch(buyCake("adarsh"));
store.dispatch(buyIcecream());
console.log('After all Updated State', store.getState());


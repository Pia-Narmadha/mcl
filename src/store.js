import { createStore } from "redux"; //an import from the redux library

const initialState = { 
                        inputFile:{},
                        testFile:{},
                        chartData:[{x:1,y:1},{x:2,y:2},{x:3,y:1}],
                        regressionType:1,
                        score:0,
                        predictedValues:[],
                        chartColors:[],
                    };
export const store = createStore(reducer, initialState);

export function reducer (state, action)  {
    switch (action.type) {
        case "SET_INPUT_FILE":
            return {
                        ...state,
                        inputFile: action.inputFile
                    };
        case "SET_TEST_FILE":
            return {
                        ...state,
                        testFile: action.testFile
                    };
        case "SET_REGRESSION_TYPE":
            return {
                        ...state,
                        regressionType: action.regressionType
                    };
        case "SET_CHART_DATA":
            return {
                        ...state,
                        chartData: [...action.chartData]
                    };
        case "SET_SCORE":
            return {
                        ...state,
                        score: action.score
                    };
        case "SET_PREDICTED_VALUES":
            return {
                        ...state,
                        predictedValues: action.predictedValues
                    };
        default:
            return state;
  }
};

function setTechnology (text) {
  return {
     type: "SET_TECHNOLOGY",
     text: text
   }
}
import { useReducer } from 'react';

function reducer(state, action){
    return {
        ...state,
        [action.name] : action.value
    }
}

export default function useInputs(initialForm){ 
    const [state, dispatch] = useReducer(reducer, initialForm);
    // useInputs(initialForm) 이라는 함수를 useRedcuer의 기본값으로 넣어줌 

    const onChange = e => {
        dispatch(e.target);
    };
   // onChange 함수가 해당 엘리먼트 액션을 실행시킴

    return [ state, onChange ]
    // useInput 함수의 현재 상태와 업데이트 된 상태를 반환함
}



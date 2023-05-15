import React from 'react'
import { useReducer } from 'react';



function reducer() {
    const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer();
    return (
        <div>reducer</div>
    )
}

export default reducer;
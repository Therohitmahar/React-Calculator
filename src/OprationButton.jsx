import React from 'react'
import { ACTIONS } from './App'

function OperationButton({operation, dispatch,className}) {
  return (
    <button className={className} onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPERATIONS, payload: {operation}})}>{operation}</button>
    )
}

export default OperationButton;
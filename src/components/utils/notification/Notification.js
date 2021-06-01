import React from 'react'
import styled from 'styled-components'


export const showError = (error) => {
    const Error = styled.div`
    background: rgba(214, 10, 10);
    color: #fff9;
    text-align: center;
    padding: 10px 0;
    letter-spacing: 1.3px;
    `

    return (
        <Error>
         {error}
        </Error>
    )
  
}

export const showSuccess = (error) => {
    const Success = styled.div`
    background: lightgreen;
    color: #fff9;
    text-align: center;
    padding: 10px 0;
    letter-spacing: 1.3px;
    `
    return (
        <Success>
          {error}
        </Success>
    )

  
}


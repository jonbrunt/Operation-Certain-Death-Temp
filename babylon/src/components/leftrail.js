import React from 'react';
import styled from 'styled-components';
import Button from './button';

const StyledRail = styled.div`
  width: 210px;
  min-height: 400px;
  padding: 15px;
  background-color: #d7d7d7;
  border-right: 1px solid #bfbfc0;

  h1 {
    font-size: 3.1rem;
    letter-spacing: 1px; 
    font-weight: bold;
    color: #4a494a;
  }

`;

const LeftRail = props => (
  <StyledRail>
    <h1>Operation Babylon</h1>
    <Button backgroundColor='#5dbdc2' title='View Your Notes' />
    <Button backgroundColor='#5dbdc2' title='+ Create New Note' />
  </StyledRail>
);

export default LeftRail;

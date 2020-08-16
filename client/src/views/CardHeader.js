import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  font-size: 18px;
  padding: 5px;
  display: flex;
  align-items: baseline;
  color: white;
`;

const CardHeader = ({ title , backgroundColor, position, width, zIndex, borderRadius}) => (
   <Container style={{background: backgroundColor, position: position, width: width, zIndex: zIndex, borderRadius: borderRadius}}>
       &nbsp;
       &nbsp;
       <h2>{title}</h2>
   </Container>
);

export default CardHeader
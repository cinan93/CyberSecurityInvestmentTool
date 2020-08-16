import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
  font-size: 18px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  color: white;
  background: rgba(0,0,0,0.98);
  height: 10%;
`;


export default HeaderContent => (
    <Container>
        <span>Cybersecurity Planning Tool</span>
    </Container>
)
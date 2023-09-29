"use client";

import styles from './page.module.css'
import Schedule from './components/Schedule'
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: 100vh;
  background: url(images/bg.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <StyledMain>
      {/* <Header /> */}
      <Schedule />
    </StyledMain>
  )
}

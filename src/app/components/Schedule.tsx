'use client';

import React, { useEffect, useState } from 'react';
import { weekdays } from '@/app/data/seedData';
import styled, { keyframes } from 'styled-components';

interface ScheduleData {
    dayName: string;
    hours: Record<string, string | null>;
}


const jumpAnimation = keyframes`
    0% { background-position: -16px -16px; }
    20% { background-position: -32px -16px; }
    40% { background-position: -48px -16px; }
    60% { background-position: -64px -16px; }
    80% { background-position: -80px -16px; }
    100% { background-position: -96px -16px; }
`;

const idleAnimation = keyframes`
    0% { background-position: -96px -48px; }
    80% { background-position: -80px -48px; }
`;
const IdleGuy = styled.div`
    align-self: center;
    width: 16px;
    height: 16px; 
    background-image: url('images/robotguy.png');
    background-position: -16px -16px; /* Initial position */
    animation: ${idleAnimation} 5s steps(1) infinite; /* Animation with steps(1) */
    transform: scaleX(-1) scale(4); /* Horizontal flip and scale up three times */
    filter: hue-rotate(150deg); /* Hue shift effect */
    image-rendering: pixelated;
`;
const JumpGuy = styled.div`
    align-self: center;
    width: 16px;
    height: 16px;
    background-image: url('images/robotguy.png');
    background-position: -16px -16px; /* Initial position */
    animation: ${jumpAnimation} 1s steps(1) infinite; /* Animation with steps(1) */
    transform: scale(4);
    image-rendering: pixelated;
`;

const StyledH2 = styled.h2`
    color: orangered;
    font-size: 2rem;
    padding: 0 2rem;
`;
const StyledDiv = styled.div`
    background: aliceblue;
    padding:0.5rem 1rem;
    margin:0 0.5rem;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
    border: 3px solid #000;
`;
const Wrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 25px 0 75px;
`;
const StyledUl = styled.ul`
    list-style: none;
`;


export default function Schedule() {
    const [scheduleDataState, setScheduleDataState] = useState<ScheduleData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedData = localStorage.getItem('scheduleData');
        // console.log('Stored Data:', storedData);

        // change to enable local storage
        if (!storedData) {
            // Initialize scheduleDataState with weekdays
            const weekdaysData: ScheduleData[] = weekdays.map((weekday: any) => ({
                dayName: weekday.dayName,
                hours: { ...weekday.hours },
            }));
            setScheduleDataState(weekdaysData);

            localStorage.setItem('scheduleData', JSON.stringify(weekdaysData));
            console.log('Data initialized with weekdays:', weekdaysData);
        } else {
            const parsedData = JSON.parse(storedData);
            setScheduleDataState(parsedData);
            console.log('Data loaded from local storage:', parsedData);
        }

        setIsLoading(false);
    }, []);

    // Get today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    return (
        <div>

            <Wrapper>
                <StyledDiv>
                    <StyledH2>Class Cards</StyledH2>
                </StyledDiv>
                <JumpGuy></JumpGuy>
                <div></div>
                <IdleGuy></IdleGuy>
                <StyledDiv>
                    <StyledH2>{formattedDate}</StyledH2>
                </StyledDiv>
            </Wrapper>
            <Wrapper>
                {isLoading ? (
                    <p>Loading... 😭</p>
                ) : (
                    <StyledDiv>
                        <h2>🕰️</h2>
                        <StyledUl>
                            {Object.keys(scheduleDataState[0].hours).map((time, key) => (
                                <li key={key}>
                                    {time.split(":00")[0] + time.split(":00")[1]}
                                </li>
                            ))}
                        </StyledUl>
                    </StyledDiv>
                )}
                {isLoading ? (
                    <p>Loading... 😭</p>
                ) : (
                    scheduleDataState.map((day) => (
                        <StyledDiv key={day.dayName}>
                            <h2>{day.dayName}</h2>
                            <StyledUl>
                                {Object.keys(day.hours).map((time) => (
                                    <li key={time}>
                                        {day.hours[time] || '🤷🏻‍♂️ Nothing'}
                                    </li>
                                ))}
                            </StyledUl>
                        </StyledDiv>
                    ))
                )}

            </Wrapper>


        </div>
    );
}
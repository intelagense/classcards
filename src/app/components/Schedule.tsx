'use client';

import React, { useEffect, useState } from 'react';
import { weekdays } from '@/app/data/seedData';
import styled from 'styled-components';

interface ScheduleData {
    dayName: string;
    hours: Record<string, string | null>;
}

const StyledDiv = styled.div`
    background: aliceblue;
    padding:0.5rem 0.5rem;
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
`;
const StyledUl = styled.ul`
    list-style: none;
`;

export default function Schedule() {
    const [scheduleDataState, setScheduleDataState] = useState<ScheduleData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedData = localStorage.getItem('scheduleData');
        console.log('Stored Data:', storedData);

        // change to enable local storage
        if (storedData) {
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
        <StyledDiv>

            <Wrapper>
                <StyledDiv>
                    <h1>Class Cards</h1>
                </StyledDiv>
                <StyledDiv>
                    <h2>{formattedDate}</h2>
                </StyledDiv>
            </Wrapper>
            {/* {time.split(":00")[0] + time.split(":00")[1]}:  */}
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
        </StyledDiv>
    );
}
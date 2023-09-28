'use client';

import React, { useEffect, useState } from 'react';
import { weekdays } from '@/app/data/seedData';

interface ScheduleData {
    dayName: string;
    hours: Record<string, string | null>;
}

export default function Schedule() {
    const [scheduleDataState, setScheduleDataState] = useState<ScheduleData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedData = localStorage.getItem('scheduleData');
        console.log('Stored Data:', storedData);

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

    return (
        <div>
            <h1>Class Cards</h1>
            {isLoading ? (
                <p>Loading... 😭</p>
            ) : (
                scheduleDataState.map((day) => (
                    <div key={day.dayName}>
                        <h2>{day.dayName}</h2>
                        <ul>
                            {Object.keys(day.hours).map((time) => (
                                <li key={time}>
                                    {time}: {day.hours[time] || 'No class'}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <h1>this is only a test</h1>
        </div>
    );
}
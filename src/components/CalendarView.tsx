import React, { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import clsx from 'clsx';
import type { RunEvent, EventType } from '../types';

interface CalendarViewProps {
    events: RunEvent[];
    activeType: EventType;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, activeType }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start at Jan 2026

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    // Get events for the current month view (somewhat inefficient but fine for small dataset)
    const getEventsForDay = (day: Date) => {
        return events.filter(event => isSameDay(new Date(event.date), day));
    };



    // Swipe handlers
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextMonth(); // Swipe Left -> Next Month
        }
        if (isRightSwipe) {
            prevMonth(); // Swipe Right -> Prev Month
        }
    };

    return (
        <div
            className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                    {format(currentDate, 'yyyy년 M월', { locale: ko })}
                </h2>
                <div className="flex space-x-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-400">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr flex-1 bg-white">
                {days.map((day, dayIdx) => {
                    const dayEvents = getEventsForDay(day);
                    const isCurrentMonth = isSameMonth(day, monthStart);

                    return (
                        <div
                            key={day.toString()}
                            className={clsx(
                                "min-h-[100px] p-2 border-b border-r border-gray-50 flex flex-col transition-colors hover:bg-gray-50/30",
                                !isCurrentMonth && "bg-gray-50/30 text-gray-400",
                                dayIdx % 7 === 0 && "text-red-400", // Sundays redundant check but usually handled by date
                                dayIdx % 7 === 6 && "text-blue-400"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span className={clsx(
                                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                                    isSameDay(day, new Date()) && "bg-blue-600 text-white"
                                )}>
                                    {format(day, 'd')}
                                </span>
                            </div>

                            <div className="mt-1 flex flex-col gap-1 overflow-y-auto max-h-[120px]">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className={clsx(
                                            "text-xs p-1.5 rounded-md border shadow-sm cursor-pointer transition-transform hover:-translate-y-0.5",
                                            activeType === 'ROAD'
                                                ? "bg-blue-50 border-blue-100 text-blue-700 hover:border-blue-300"
                                                : "bg-emerald-50 border-emerald-100 text-emerald-700 hover:border-emerald-300"
                                        )}
                                        onClick={() => {
                                            if (event.url) {
                                                window.open(event.url, '_blank');
                                            } else {
                                                alert(event.name + "\n" + (event.description || "상세 정보가 없습니다."));
                                            }
                                        }}
                                    >
                                        <div className="font-semibold truncate">{event.name}</div>
                                        <div className="flex items-center gap-1 text-[10px] opacity-80 mt-0.5">
                                            <MapPin size={10} />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

import React from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import type { RunEvent, EventType } from '../types';

interface ListViewProps {
    events: RunEvent[];
    activeType: EventType;
}

export const ListView: React.FC<ListViewProps> = ({ events, activeType }) => {
    // Group events by month
    const groupedEvents = events.reduce((acc, event) => {
        const month = format(parseISO(event.date), 'yyyy년 M월', { locale: ko });
        if (!acc[month]) acc[month] = [];
        acc[month].push(event);
        return acc;
    }, {} as Record<string, RunEvent[]>);

    // Sort months logic
    const sortedMonths = Object.keys(groupedEvents).sort((a, b) => {
        const parseKoreanDate = (str: string) => {
            const parts = str.match(/(\d+)년 (\d+)월/);
            if (!parts) return 0;
            return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1).getTime();
        };
        return parseKoreanDate(a) - parseKoreanDate(b);
    });

    return (
        <div className="space-y-8 pb-20">
            {sortedMonths.map(month => (
                <div key={month} className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-500 sticky top-16 bg-gray-50/90 backdrop-blur-sm py-2 px-1 z-10 w-fit rounded-lg">{month}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedEvents[month].map(event => (
                            <div
                                key={event.id}
                                className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className={clsx(
                                        "px-2.5 py-1 text-xs font-semibold rounded-full",
                                        activeType === 'ROAD' ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                                    )}>
                                        D-{Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                        <Calendar size={12} />
                                        {event.date}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {event.name}
                                </h4>

                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        {event.location}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {event.distances.map(d => (
                                            <span key={d} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href={event.url || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={clsx(
                                        "inline-flex items-center gap-1 text-sm font-semibold transition-colors",
                                        activeType === 'ROAD' ? "text-blue-600 hover:text-blue-800" : "text-emerald-600 hover:text-emerald-800",
                                        !event.url && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    Visit Website <ArrowRight size={16} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

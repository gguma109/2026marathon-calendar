import React from 'react';
import { Compass, Map, Grid, List as ListIcon } from 'lucide-react';
import clsx from 'clsx';
import type { EventType, ViewMode } from '../types';

interface HeaderProps {
    activeType: EventType;
    onTypeChange: (type: EventType) => void;
    viewMode: ViewMode;
    onViewChange: (mode: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeType, onTypeChange, viewMode, onViewChange }) => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        K-RUN 2026
                    </h1>
                </div>

                {/* Center: Type Toggle */}
                <div className="hidden md:flex bg-gray-100/80 p-1 rounded-xl">
                    <button
                        onClick={() => onTypeChange('ROAD')}
                        className={clsx(
                            "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2",
                            activeType === 'ROAD'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Map size={16} />
                        LOAD
                    </button>
                    <button
                        onClick={() => onTypeChange('TRAIL')}
                        className={clsx(
                            "px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2",
                            activeType === 'TRAIL'
                                ? "bg-white text-emerald-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Compass size={16} />
                        TRAIL
                    </button>
                </div>

                {/* Right: View Toggle & Mobile Menu Placeholder */}
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-100/80 p-1 rounded-lg flex">
                        <button
                            onClick={() => onViewChange('CALENDAR')}
                            className={clsx(
                                "p-2 rounded-md transition-all",
                                viewMode === 'CALENDAR' ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => onViewChange('LIST')}
                            className={clsx(
                                "p-2 rounded-md transition-all",
                                viewMode === 'LIST' ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Type Menu (visible on small screens) */}
            <div className="md:hidden border-t border-gray-100 flex">
                <button
                    onClick={() => onTypeChange('ROAD')}
                    className={clsx(
                        "flex-1 py-3 text-sm font-medium flex justify-center items-center gap-2 transition-colors",
                        activeType === 'ROAD' ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500"
                    )}
                >
                    <Map size={16} /> ROAD
                </button>
                <button
                    onClick={() => onTypeChange('TRAIL')}
                    className={clsx(
                        "flex-1 py-3 text-sm font-medium flex justify-center items-center gap-2 transition-colors",
                        activeType === 'TRAIL' ? "bg-emerald-50 text-emerald-600" : "bg-white text-gray-500"
                    )}
                >
                    <Compass size={16} /> TRAIL
                </button>
            </div>
        </header>
    );
};

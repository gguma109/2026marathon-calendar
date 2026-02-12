import { useState } from 'react';
import { Header } from './components/Header';
import { CalendarView } from './components/CalendarView';
import { ListView } from './components/ListView';
import type { EventType, ViewMode, RunEvent } from './types';
import eventsData from './data/events.json';

function App() {
  const [activeType, setActiveType] = useState<EventType>('ROAD');
  const [viewMode, setViewMode] = useState<ViewMode>('CALENDAR');

  // Filter events based on active category
  const filteredEvents = (eventsData as RunEvent[]).filter(e => e.type === activeType);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header
        activeType={activeType}
        onTypeChange={setActiveType}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Animated Page Transition Wrapper could go here */}
        <div className="h-full">
          {viewMode === 'CALENDAR' ? (
            <div className="h-[800px]"> {/* Fixed height for calendar container */}
              <CalendarView events={filteredEvents} activeType={activeType} />
            </div>
          ) : (
            <ListView events={filteredEvents} activeType={activeType} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 K-RUN CALENDAR. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

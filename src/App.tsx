import { Routes, Route, Navigate } from 'react-router-dom';
import MeetingRecordingControl from './pages/MeetingRecordingControl';
import ImportMeetings from './pages/ImportMeetings';
import SearchTranscripts from './pages/SearchTranscripts';
import RetentionPolicySettings from './pages/RetentionPolicySettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/meetings" replace />} />
      <Route path="/meetings" element={<MeetingRecordingControl />} />
      <Route path="/meetings/import" element={<ImportMeetings />} />
      <Route path="/content/search" element={<SearchTranscripts />} />
      <Route path="/settings/retention" element={<RetentionPolicySettings />} />
    </Routes>
  );
}

export default App;

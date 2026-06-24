import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AppLayout from '../components/layout/AppLayout';

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
type Source = 'outlook' | 'google' | 'file';

interface MeetingRow {
  id: number;
  date: string;
  time: string;
  title: string;
  avatars: { bg: string; label: string }[];
  extra?: number;
}

/* ─────────────────────────────────────────────────────────
   Avatar stack helper
───────────────────────────────────────────────────────── */
function AvatarStack({
  avatars,
  extra,
}: {
  avatars: { bg: string; label: string }[];
  extra?: number;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {avatars.map((av, i) => (
        <Box
          key={i}
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: av.bg,
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: i === 0 ? 0 : '-8px',
            fontSize: 9,
            fontWeight: 700,
            color: '#fff',
            zIndex: avatars.length - i,
            position: 'relative',
          }}
        >
          {av.label}
        </Box>
      ))}
      {extra !== undefined && (
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: 'var(--color-primary)',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: '-8px',
            fontSize: 8,
            fontWeight: 700,
            color: '#fff',
            position: 'relative',
            zIndex: 0,
          }}
        >
          +{extra}
        </Box>
      )}
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   Meeting rows data
───────────────────────────────────────────────────────── */
const MEETINGS: MeetingRow[] = [
  {
    id: 1,
    date: 'Oct 24, 2023',
    time: '10:00 AM',
    title: 'Q2 Strategy Planning',
    avatars: [
      { bg: '#cbd5e1', label: 'SJ' },
      { bg: '#bfdbfe', label: 'MD' },
      { bg: '#fed7aa', label: 'KL' },
    ],
    extra: 5,
  },
  {
    id: 2,
    date: 'Oct 24, 2023',
    time: '02:30 PM',
    title: 'Product Review: V2.0',
    avatars: [
      { bg: '#a7f3d0', label: 'RP' },
      { bg: '#e9d5ff', label: 'TC' },
    ],
  },
  {
    id: 3,
    date: 'Oct 23, 2023',
    time: '09:15 AM',
    title: 'Engineering 1:1 Sync',
    avatars: [
      { bg: '#fbcfe8', label: 'AL' },
      { bg: '#e5e7eb', label: 'BW' },
    ],
  },
  {
    id: 4,
    date: 'Oct 22, 2023',
    time: '11:00 AM',
    title: 'Monthly All-Hands',
    avatars: [
      { bg: '#fef08a', label: 'DK' },
      { bg: '#c7d2fe', label: 'NP' },
      { bg: '#fecaca', label: 'OB' },
    ],
    extra: 42,
  },
];

/* ─────────────────────────────────────────────────────────
   ImportMeetings Page
───────────────────────────────────────────────────────── */
export default function ImportMeetings() {
  const [selectedSource, setSelectedSource] = useState<Source>('google');
  const [rowChecked, setRowChecked] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  // Import options checkboxes
  const [autoAssign, setAutoAssign] = useState(true);
  const [detectParticipants, setDetectParticipants] = useState(true);
  const [importTranscripts, setImportTranscripts] = useState(false);

  // Global metadata selects
  const [meetingType, setMeetingType] = useState('Internal Sync');
  const [department, setDepartment] = useState('Engineering');

  const toggleRow = (id: number) => {
    setRowChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedCount = Object.values(rowChecked).filter(Boolean).length;

  /* ── helper: select box shared styles ── */
  const selectSx = {
    height: 40,
    bgcolor: 'var(--md3-surface-container-lowest)',
    border: '1px solid var(--md3-outline-variant)',
    borderRadius: 'var(--radius-md)',
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& .MuiSelect-select': {
      px: 'var(--space-md)',
      fontSize: 'var(--font-size-body)',
      color: 'var(--md3-on-surface)',
    },
  };

  return (
    <AppLayout activeNav="meetings">
      <Box
        sx={{
          p: 'var(--space-2xl)',
          maxWidth: 1280,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xl)',
          pb: '80px',
        }}
      >
        {/* ── Section 1: Header ── */}
        <Box>
          <Typography
            sx={{
              fontSize: 'var(--font-size-h1)',
              fontWeight: 700,
              color: 'var(--md3-on-surface)',
              mb: 'var(--space-xs)',
            }}
          >
            Import Meetings
          </Typography>
          <Typography
            sx={{ fontSize: 'var(--font-size-body)', color: 'var(--md3-on-surface-variant)' }}
          >
            Connect your calendar or upload files to synchronize your meeting intelligence.
          </Typography>
        </Box>

        {/* ── Section 2: Source Selection ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 'var(--space-md)',
          }}
        >
          {/* Outlook */}
          <Box
            onClick={() => setSelectedSource('outlook')}
            sx={{
              position: 'relative',
              bgcolor:
                selectedSource === 'outlook'
                  ? 'var(--md3-primary-fixed)'
                  : 'var(--md3-surface-container-lowest)',
              border:
                selectedSource === 'outlook'
                  ? '2px solid var(--color-primary)'
                  : '1px solid var(--md3-outline-variant)',
              borderRadius: '16px',
              p: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              boxShadow: selectedSource === 'outlook' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover':
                selectedSource !== 'outlook'
                  ? {
                      borderColor: 'var(--color-primary)',
                      bgcolor: 'var(--md3-surface-container)',
                    }
                  : {},
            }}
          >
            {selectedSource === 'outlook' && (
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: 20,
                  color: 'var(--color-primary)',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                check_circle
              </span>
            )}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 48, color: 'var(--color-primary)' }}
            >
              calendar_today
            </span>
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
              }}
            >
              Outlook
            </Typography>
          </Box>

          {/* Google Calendar */}
          <Box
            onClick={() => setSelectedSource('google')}
            sx={{
              position: 'relative',
              bgcolor:
                selectedSource === 'google'
                  ? 'var(--md3-primary-fixed)'
                  : 'var(--md3-surface-container-lowest)',
              border:
                selectedSource === 'google'
                  ? '2px solid var(--color-primary)'
                  : '1px solid var(--md3-outline-variant)',
              borderRadius: '16px',
              p: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              boxShadow: selectedSource === 'google' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover':
                selectedSource !== 'google'
                  ? {
                      borderColor: 'var(--color-primary)',
                      bgcolor: 'var(--md3-surface-container)',
                    }
                  : {},
            }}
          >
            {selectedSource === 'google' && (
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: 20,
                  color: 'var(--color-primary)',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                check_circle
              </span>
            )}
            {/* Blue circle with event icon */}
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 24, color: 'white' }}
              >
                event
              </span>
            </Box>
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
              }}
            >
              Google Calendar
            </Typography>
          </Box>

          {/* File Upload */}
          <Box
            onClick={() => setSelectedSource('file')}
            sx={{
              position: 'relative',
              bgcolor:
                selectedSource === 'file'
                  ? 'var(--md3-primary-fixed)'
                  : 'var(--md3-surface-container-lowest)',
              border:
                selectedSource === 'file'
                  ? '2px solid var(--color-primary)'
                  : '1px solid var(--md3-outline-variant)',
              borderRadius: '16px',
              p: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              boxShadow: selectedSource === 'file' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover':
                selectedSource !== 'file'
                  ? {
                      borderColor: 'var(--color-primary)',
                      bgcolor: 'var(--md3-surface-container)',
                    }
                  : {},
            }}
          >
            {selectedSource === 'file' && (
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: 20,
                  color: 'var(--color-primary)',
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                check_circle
              </span>
            )}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 48, color: 'var(--md3-on-surface-variant)' }}
            >
              attach_file
            </span>
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
              }}
            >
              File Upload
            </Typography>
          </Box>
        </Box>

        {/* ── Section 3: Selected Source Context Bar ── */}
        <Box
          sx={{
            bgcolor: 'var(--md3-surface-container-low)',
            border: '1px solid var(--md3-outline-variant)',
            borderRadius: 'var(--radius-md)',
            p: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          {/* Left: icon + text */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'white',
                border: '1px solid var(--md3-outline-variant)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#3b82f6' }}>
                event
              </span>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 700,
                  color: 'var(--md3-on-surface)',
                }}
              >
                Google Calendar Sync
              </Typography>
              <Typography
                sx={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--md3-on-surface-variant)',
                }}
              >
                Scanning events for the last 30 days
              </Typography>
            </Box>
          </Box>

          {/* Right: Connected badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              px: 'var(--space-lg)',
              py: 'var(--space-sm)',
              bgcolor: 'var(--color-success-light)',
              border: '1px solid var(--color-success)',
              color: 'var(--color-success)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 16,
                fontVariationSettings: "'FILL' 1",
                color: 'var(--color-success)',
              }}
            >
              verified
            </span>
            <Typography
              sx={{
                fontSize: 'var(--font-size-label)',
                color: 'var(--color-success)',
                fontWeight: 500,
              }}
            >
              Connected as: user@example.com
            </Typography>
          </Box>
        </Box>

        {/* ── Section 4: Meetings Table ── */}
        <Box
          sx={{
            bgcolor: 'var(--md3-surface-container-lowest)',
            border: '1px solid var(--md3-outline-variant)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Table header bar */}
          <Box
            sx={{
              px: 'var(--space-lg)',
              py: 'var(--space-md)',
              bgcolor: 'var(--md3-surface-container-lowest)',
              borderBottom: '1px solid var(--md3-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'var(--font-size-h3)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
              }}
            >
              Available Meetings
            </Typography>

            {/* Pagination controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <Typography
                sx={{
                  fontSize: 'var(--font-size-body-small)',
                  color: 'var(--md3-on-surface-variant)',
                  mr: 'var(--space-sm)',
                }}
              >
                Rows per page: 8
              </Typography>

              {/* Prev chevron */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'var(--md3-surface-container)' },
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  chevron_left
                </span>
              </Box>

              {[1, 2, 3].map((page) => (
                <Box
                  key={page}
                  sx={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-sm)',
                    bgcolor: page === 1 ? 'var(--color-primary)' : 'transparent',
                    color:
                      page === 1 ? 'white' : 'var(--md3-on-surface-variant)',
                    fontSize: 'var(--font-size-body-small)',
                    fontWeight: page === 1 ? 700 : 400,
                    cursor: 'pointer',
                    '&:hover':
                      page !== 1 ? { bgcolor: 'var(--md3-surface-container)' } : {},
                  }}
                >
                  {page}
                </Box>
              ))}

              {/* Next chevron */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'var(--md3-surface-container)' },
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  chevron_right
                </span>
              </Box>
            </Box>
          </Box>

          {/* Table */}
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: 'var(--md3-surface-container-lowest)',
                  '& .MuiTableCell-head': {
                    fontSize: 'var(--font-size-label)',
                    fontWeight: 700,
                    color: 'var(--md3-on-surface-variant)',
                    borderBottom: '1px solid var(--md3-outline-variant)',
                    py: 'var(--space-sm)',
                    px: 'var(--space-lg)',
                  },
                }}
              >
                <TableCell padding="checkbox" sx={{ pl: 'var(--space-lg) !important' }}>
                  <Checkbox
                    checked={Object.values(rowChecked).every(Boolean)}
                    indeterminate={
                      Object.values(rowChecked).some(Boolean) &&
                      !Object.values(rowChecked).every(Boolean)
                    }
                    onChange={(e) => {
                      const all = e.target.checked;
                      setRowChecked({ 1: all, 2: all, 3: all, 4: all });
                    }}
                    sx={{
                      color: 'var(--md3-outline)',
                      '&.Mui-checked': { color: 'var(--color-primary)' },
                      '&.MuiCheckbox-indeterminate': { color: 'var(--color-primary)' },
                    }}
                  />
                </TableCell>
                <TableCell>Date &amp; Time</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Attendees</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MEETINGS.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  onClick={() => toggleRow(meeting.id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'var(--md3-surface-container-low)' },
                    '& .MuiTableCell-root': {
                      fontSize: 'var(--font-size-body)',
                      color: 'var(--md3-on-surface)',
                      borderBottom: '1px solid var(--md3-outline-variant)',
                      py: 'var(--space-md)',
                      px: 'var(--space-lg)',
                    },
                  }}
                >
                  <TableCell
                    padding="checkbox"
                    sx={{ pl: 'var(--space-lg) !important' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={!!rowChecked[meeting.id]}
                      onChange={() => toggleRow(meeting.id)}
                      sx={{
                        color: 'var(--md3-outline)',
                        '&.Mui-checked': { color: 'var(--color-primary)' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontSize: 'var(--font-size-body)', color: 'var(--md3-on-surface)' }}
                    >
                      {meeting.date}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 'var(--font-size-body-small)',
                        color: 'var(--md3-on-surface-variant)',
                      }}
                    >
                      {meeting.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 'var(--font-size-body)',
                        fontWeight: 500,
                        color: 'var(--md3-on-surface)',
                      }}
                    >
                      {meeting.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <AvatarStack avatars={meeting.avatars} extra={meeting.extra} />
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      sx={{
                        color: 'var(--color-primary)',
                        fontSize: 'var(--font-size-label)',
                        textTransform: 'none',
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                      }}
                    >
                      Preview
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* ── Section 5: Import Options (2 columns on lg+) ── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 'var(--space-lg)',
          }}
        >
          {/* Left: Intelligent Import Options */}
          <Box
            sx={{
              bgcolor: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: '16px',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
                pb: 'var(--space-md)',
                mb: 'var(--space-md)',
                borderBottom: '1px solid var(--md3-outline-variant)',
              }}
            >
              Intelligent Import Options
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Option 1 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <Checkbox
                  checked={autoAssign}
                  onChange={(e) => setAutoAssign(e.target.checked)}
                  sx={{
                    mt: '-4px',
                    color: 'var(--md3-outline)',
                    '&.Mui-checked': { color: 'var(--color-primary)' },
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: 500,
                      color: 'var(--md3-on-surface)',
                    }}
                  >
                    Auto-assign topics from title
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body-small)',
                      color: 'var(--md3-on-surface-variant)',
                    }}
                  >
                    Uses NLP to categorize meeting content automatically
                  </Typography>
                </Box>
              </Box>

              {/* Option 2 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <Checkbox
                  checked={detectParticipants}
                  onChange={(e) => setDetectParticipants(e.target.checked)}
                  sx={{
                    mt: '-4px',
                    color: 'var(--md3-outline)',
                    '&.Mui-checked': { color: 'var(--color-primary)' },
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: 500,
                      color: 'var(--md3-on-surface)',
                    }}
                  >
                    Detect participants from meeting
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body-small)',
                      color: 'var(--md3-on-surface-variant)',
                    }}
                  >
                    Syncs external guest data with internal workspace profiles
                  </Typography>
                </Box>
              </Box>

              {/* Option 3 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <Checkbox
                  checked={importTranscripts}
                  onChange={(e) => setImportTranscripts(e.target.checked)}
                  sx={{
                    mt: '-4px',
                    color: 'var(--md3-outline)',
                    '&.Mui-checked': { color: 'var(--color-primary)' },
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body)',
                      fontWeight: 500,
                      color: 'var(--md3-on-surface)',
                    }}
                  >
                    Import transcripts if available
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'var(--font-size-body-small)',
                      color: 'var(--md3-on-surface-variant)',
                    }}
                  >
                    Pulls text logs from Zoom or Google Meet history
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right: Global Metadata Assignment */}
          <Box
            sx={{
              bgcolor: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: '16px',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
                pb: 'var(--space-md)',
                mb: 'var(--space-lg)',
                borderBottom: '1px solid var(--md3-outline-variant)',
              }}
            >
              Global Metadata Assignment
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Default Meeting Type */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 500,
                    color: 'var(--md3-on-surface)',
                    mb: 'var(--space-xs)',
                  }}
                >
                  Default Meeting Type
                </Typography>
                <Select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  fullWidth
                  sx={selectSx}
                >
                  <MenuItem value="Internal Sync">Internal Sync</MenuItem>
                  <MenuItem value="Client Workshop">Client Workshop</MenuItem>
                  <MenuItem value="Strategic Planning">Strategic Planning</MenuItem>
                  <MenuItem value="Standard Review">Standard Review</MenuItem>
                </Select>
              </Box>

              {/* Assign to Department */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 500,
                    color: 'var(--md3-on-surface)',
                    mb: 'var(--space-xs)',
                  }}
                >
                  Assign to Department
                </Typography>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  sx={selectSx}
                >
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Product Management">Product Management</MenuItem>
                  <MenuItem value="Executive Board">Executive Board</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Footer Action Bar (fixed) ── */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 240,
          right: 0,
          height: 80,
          bgcolor: 'var(--md3-surface-container-lowest)',
          borderTop: '1px solid var(--md3-outline-variant)',
          px: 'var(--space-2xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
        }}
      >
        {/* Left info */}
        <Box>
          <Typography
            sx={{
              fontSize: 'var(--font-size-h4)',
              fontWeight: 700,
              color: 'var(--color-primary)',
            }}
          >
            {selectedCount} meeting{selectedCount !== 1 ? 's' : ''} selected
          </Typography>
          <Typography
            sx={{ fontSize: 'var(--font-size-body-small)', color: 'var(--md3-on-surface-variant)' }}
          >
            Estimated processing time: ~3 minutes
          </Typography>
        </Box>

        {/* Right buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          {/* Clear All */}
          <Button
            sx={{
              px: 'var(--space-xl)',
              py: '12px',
              border: '1px solid var(--md3-outline)',
              color: 'var(--md3-on-surface-variant)',
              borderRadius: 'var(--radius-md)',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'var(--md3-surface-container)' },
            }}
          >
            Clear All
          </Button>

          {/* Validate */}
          <Button
            sx={{
              px: 'var(--space-xl)',
              py: '12px',
              border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'var(--md3-primary-fixed)' },
            }}
          >
            Validate
          </Button>

          {/* Import Now */}
          <Button
            variant="contained"
            disableElevation
            startIcon={
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                file_download
              </span>
            }
            sx={{
              px: '64px',
              py: '12px',
              bgcolor: 'var(--color-primary)',
              color: 'white',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              textTransform: 'none',
              '&:hover': { bgcolor: '#6d31d4' },
            }}
          >
            Import Now
          </Button>
        </Box>
      </Box>
    </AppLayout>
  );
}

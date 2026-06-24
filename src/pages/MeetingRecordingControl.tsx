import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import AppLayout from '../components/layout/AppLayout';

/* ─────────────────────────────────────────────────────────
   Background (dimmed meeting-detail view)
───────────────────────────────────────────────────────── */
function MeetingDetailBackground() {
  return (
    <Box sx={{ p: 'var(--space-2xl)' }}>
      {/* Header */}
      <Box sx={{ mb: 'var(--space-lg)' }}>
        <Typography
          sx={{
            fontSize: 'var(--font-size-h1)',
            fontWeight: 700,
            color: 'var(--md3-on-surface)',
            mb: 'var(--space-xs)',
          }}
        >
          Q3 Strategic Planning Session
        </Typography>
        <Typography
          sx={{
            fontSize: 'var(--font-size-body)',
            color: 'var(--md3-on-surface-variant)',
          }}
        >
          Aug 24, 2024 • 2:00 PM - 3:30 PM
        </Typography>

        {/* Participants badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            mt: 'var(--space-sm)',
            px: 'var(--space-md)',
            py: 'var(--space-xs)',
            bgcolor: 'var(--md3-surface-container)',
            border: '1px solid var(--md3-outline-variant)',
            borderRadius: 'var(--radius-full)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16, color: 'var(--md3-on-surface-variant)' }}
          >
            group
          </span>
          <Typography
            sx={{ fontSize: 'var(--font-size-body-small)', color: 'var(--md3-on-surface-variant)' }}
          >
            12 Participants
          </Typography>
        </Box>
      </Box>

      {/* 12-column grid: 8 left + 4 right */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 'var(--space-lg)',
        }}
      >
        {/* Left col: Video + Transcript */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Video placeholder */}
          <Box
            sx={{
              aspectRatio: '16/9',
              bgcolor: '#1a1a2e',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 64, color: 'rgba(255,255,255,0.3)' }}
            >
              videocam
            </span>
          </Box>

          {/* Live Transcript card */}
          <Box
            sx={{
              bgcolor: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-lg)',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
                mb: 'var(--space-md)',
              }}
            >
              Live Transcript
            </Typography>
            <Typography
              sx={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--md3-on-surface-variant)',
                mb: 'var(--space-sm)',
              }}
            >
              Sarah Johnson: &quot;We need to align on our Q3 targets before the board meeting next
              week...&quot;
            </Typography>
            <Typography
              sx={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--md3-on-surface-variant)',
              }}
            >
              Mark Davis: &quot;Agreed, let&apos;s start with the revenue projections and work
              backwards from there.&quot;
            </Typography>
          </Box>
        </Box>

        {/* Right col: Key Decisions */}
        <Box>
          <Box
            sx={{
              bgcolor: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-lg)',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
                mb: 'var(--space-md)',
              }}
            >
              Key Decisions
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-sm)',
                p: 'var(--space-md)',
                bgcolor: 'var(--md3-surface-container-low)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 18,
                  color: 'var(--color-success)',
                  marginTop: 2,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                check_circle
              </span>
              <Typography
                sx={{ fontSize: 'var(--font-size-body)', color: 'var(--md3-on-surface)' }}
              >
                Approve Q3 budget increase of 15% for engineering headcount
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   Recording Control Modal
───────────────────────────────────────────────────────── */
interface RecordingControlModalProps {
  open: boolean;
  onClose: () => void;
}

function RecordingControlModal({ open, onClose }: RecordingControlModalProps) {
  const [autoSave, setAutoSave] = useState(true);
  const [backupLocal, setBackupLocal] = useState(false);
  const [bitrate, setBitrate] = useState('High');

  const handleStop = () => {
    const confirmed = window.confirm('Are you sure you want to stop the recording?');
    if (confirmed) {
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slots={{ backdrop: 'div' }}
      slotProps={{
        backdrop: {
          style: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(51,47,57,0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 1299,
          },
        },
      }}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1300 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'var(--md3-surface-container-lowest)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--md3-outline-variant)',
          boxShadow: 'var(--shadow-xl)',
          px: 'var(--space-xl)',
          py: 'var(--space-2xl)',
          outline: 'none',
          mx: 'var(--space-md)',
        }}
      >
        {/* 1. Title */}
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--md3-on-surface)',
            mb: 'var(--space-xl)',
          }}
        >
          Recording Control
        </Typography>

        {/* 2. Status badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            bgcolor: 'var(--color-success-light)',
            border: '2px solid var(--color-success)',
            p: 'var(--space-lg)',
            borderRadius: '16px',
            mb: 'var(--space-md)',
          }}
        >
          {/* Pulsing red dot */}
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'var(--color-destructive)',
              flexShrink: 0,
              '@keyframes pulseRed': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.5, transform: 'scale(1.3)' },
              },
              animation: 'pulseRed 1.5s ease-in-out infinite',
            }}
          />

          {/* Middle text */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
              }}
            >
              Recording: ACTIVE (14:32)
            </Typography>
            <Typography
              sx={{
                fontSize: 'var(--font-size-body-small)',
                color: 'var(--md3-on-surface-variant)',
              }}
            >
              High Quality Audio &amp; Video
            </Typography>
          </Box>

          {/* REC badge */}
          <Box
            sx={{
              px: 'var(--space-md)',
              py: 'var(--space-xs)',
              bgcolor: 'var(--color-success)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.15em',
              flexShrink: 0,
            }}
          >
            REC
          </Box>
        </Box>

        {/* 3. Info row */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 'var(--space-lg)' }}>
          <Typography
            sx={{
              fontSize: 'var(--font-size-body-small)',
              color: 'var(--md3-on-surface-variant)',
            }}
          >
            Video:{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'var(--md3-on-surface)' }}>
              1080p
            </Box>{' '}
            | Audio:{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'var(--md3-on-surface)' }}>
              AAC
            </Box>
          </Typography>
        </Box>

        {/* 4. Control buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-md)',
            mb: 'var(--space-xl)',
          }}
        >
          {/* PAUSE */}
          <Button
            variant="contained"
            disableElevation
            startIcon={
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pause
              </span>
            }
            sx={{
              width: 200,
              height: 48,
              bgcolor: 'var(--md3-primary-container)',
              color: 'var(--md3-on-primary-container)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#6d31d4' },
            }}
          >
            Pause
          </Button>

          {/* STOP */}
          <Button
            variant="contained"
            disableElevation
            onClick={handleStop}
            startIcon={
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stop
              </span>
            }
            sx={{
              width: 200,
              height: 48,
              bgcolor: 'var(--color-destructive)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#dc2626' },
            }}
          >
            Stop
          </Button>
        </Box>

        {/* 5. Settings section */}
        <Box
          sx={{
            borderTop: '1px solid var(--md3-outline-variant)',
            pt: 'var(--space-xl)',
            mb: 'var(--space-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                sx={{
                  color: 'var(--md3-outline)',
                  '&.Mui-checked': { color: 'var(--color-primary)' },
                }}
              />
            }
            label={
              <Typography
                sx={{ fontSize: 'var(--font-size-body)', color: 'var(--md3-on-surface)' }}
              >
                Auto-save to cloud
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={backupLocal}
                onChange={(e) => setBackupLocal(e.target.checked)}
                sx={{
                  color: 'var(--md3-outline)',
                  '&.Mui-checked': { color: 'var(--color-primary)' },
                }}
              />
            }
            label={
              <Typography
                sx={{ fontSize: 'var(--font-size-body)', color: 'var(--md3-on-surface)' }}
              >
                Backup local copy
              </Typography>
            }
          />

          {/* Bitrate selector */}
          <Box sx={{ mt: 'var(--space-sm)' }}>
            <Typography
              sx={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--md3-on-surface)',
                mb: 'var(--space-xs)',
                fontWeight: 500,
              }}
            >
              Bitrate
            </Typography>
            <Select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
              fullWidth
              sx={{
                height: 44,
                bgcolor: 'var(--md3-surface-container-lowest)',
                border: '1px solid var(--md3-outline-variant)',
                borderRadius: 'var(--radius-md)',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '& .MuiSelect-select': {
                  px: 'var(--space-md)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--md3-on-surface)',
                },
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* 6. Footer actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
          <Button
            onClick={onClose}
            sx={{
              px: 'var(--space-xl)',
              py: 'var(--space-sm)',
              color: 'var(--md3-on-surface-variant)',
              borderRadius: 'var(--radius-md)',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'var(--md3-surface-container)' },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={onClose}
            variant="contained"
            disableElevation
            sx={{
              px: 'var(--space-xl)',
              py: 'var(--space-sm)',
              bgcolor: 'var(--color-primary)',
              color: 'white',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              textTransform: 'none',
              '&:hover': { bgcolor: '#6d31d4' },
            }}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Page Export
───────────────────────────────────────────────────────── */
export default function MeetingRecordingControl() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <AppLayout activeNav="meetings">
      {/* Background — dimmed, non-interactive */}
      <Box
        sx={{
          opacity: 0.4,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <MeetingDetailBackground />
      </Box>

      {/* Recording control modal + overlay */}
      <RecordingControlModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppLayout>
  );
}

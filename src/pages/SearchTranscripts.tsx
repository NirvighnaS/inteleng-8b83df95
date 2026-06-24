import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import AppLayout from '../components/layout/AppLayout';

interface ResultCardData {
  title: string;
  date: string;
  duration: string;
  attendees: string;
  tag: string;
  quoteText: string;
  highlights: string[];
}

function HighlightedQuote({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
          <span
            key={i}
            style={{
              background: '#FCD34D',
              color: '#1d1a24',
              padding: '0 2px',
              borderRadius: '2px',
              fontWeight: 600,
            }}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const RESULT_CARDS: ResultCardData[] = [
  {
    title: 'Q4 Revenue Projections & Strategic Growth',
    date: 'Oct 24 2023',
    duration: '45m 12s',
    attendees: '8 Attendees',
    tag: 'Strategic Sync',
    quoteText:
      '...based on the current revenue trajectory, we need to focus on scaling our infrastructure. Sarah mentioned that the compliance audit is already underway for the next quarter...',
    highlights: ['revenue', 'scaling', 'compliance'],
  },
  {
    title: 'Infrastructure Migration Roadmap Phase 2',
    date: 'Oct 22 2023',
    duration: '1h 05m',
    attendees: '12 Attendees',
    tag: 'Internal Review',
    quoteText:
      '...the technical debt is affecting our ability to scale. We should review the compliance requirements for the new cloud provider before finalizing the budget...',
    highlights: ['scale', 'compliance'],
  },
  {
    title: 'Global Compliance Framework v3.0',
    date: 'Oct 18 2023',
    duration: '28m 45s',
    attendees: '4 Attendees',
    tag: 'Audit Session',
    quoteText:
      '...full adherence to the international compliance standards is mandatory. This will secure our revenue streams in the EMEA region significantly...',
    highlights: ['compliance', 'revenue'],
  },
];

function ResultCard({
  card,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  card: ResultCardData;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        background: 'var(--md3-surface-container-lowest)',
        border: hovered
          ? '1px solid var(--color-primary)'
          : '1px solid var(--md3-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        p: 'var(--space-lg)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow 200ms, border-color 200ms',
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 'var(--space-md)',
          gap: 'var(--space-md)',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--color-primary)',
              m: 0,
              mb: 'var(--space-xs)',
              lineHeight: 1.3,
            }}
          >
            {card.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: 'calendar_today', text: card.date },
              { icon: 'schedule', text: card.duration },
              { icon: 'group', text: card.attendees },
            ].map((item) => (
              <Box
                key={item.icon}
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14, color: 'var(--md3-on-surface-variant)' }}
                >
                  {item.icon}
                </span>
                <Typography
                  sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            background: 'var(--md3-surface-container)',
            px: '12px',
            py: '4px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--md3-on-surface-variant)',
            whiteSpace: 'nowrap',
          }}
        >
          {card.tag}
        </Box>
      </Box>

      {/* Quote Block */}
      <Box
        sx={{
          borderLeft: '2px solid var(--md3-outline-variant)',
          pl: '16px',
          py: '4px',
          mb: 'var(--space-md)',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            color: 'var(--md3-on-surface-variant)',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          <HighlightedQuote text={card.quoteText} highlights={card.highlights} />
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
        <Button
          variant="contained"
          disableElevation
          sx={{
            background: 'var(--color-primary)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'none',
            px: 'var(--space-lg)',
            py: '8px',
            borderRadius: 'var(--radius-md)',
            '&:hover': { background: 'var(--color-primary)', opacity: 0.88 },
          }}
        >
          View Full
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: 'var(--md3-on-surface-variant)',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'none',
            px: 'var(--space-lg)',
            py: '8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--md3-outline-variant)',
            '&:hover': {
              background: 'var(--md3-surface-container)',
              borderColor: 'var(--md3-outline-variant)',
            },
          }}
        >
          Preview
        </Button>
        <Button
          variant="outlined"
          sx={{
            minWidth: 'auto',
            p: '8px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--md3-outline-variant)',
            color: 'var(--md3-on-surface-variant)',
            '&:hover': {
              background: 'var(--md3-surface-container)',
              borderColor: 'var(--md3-outline-variant)',
            },
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            download
          </span>
        </Button>
      </Box>
    </Box>
  );
}

export default function SearchTranscripts() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dateRange, setDateRange] = useState('last30');
  const [meetingType, setMeetingType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [activePage, setActivePage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeSentiment, setActiveSentiment] = useState<string | null>(null);

  const sentiments = ['Positive', 'Neutral', 'Critical'];
  const keywords = ['REVENUE', 'SCALE', 'COMPLIANCE'];
  const pages = [1, 2, 3, 4, 5];

  return (
    <AppLayout activeNav="content">
      <Box sx={{ p: 'var(--space-2xl)', maxWidth: '1280px', mx: 'auto' }}>
        {/* ── Section 1: Main Search Bar ── */}
        <Box sx={{ position: 'relative', mb: 'var(--space-xl)' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 24,
              color: 'var(--md3-on-surface-variant)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            search
          </span>
          <Box
            component="input"
            placeholder="Search transcripts, speakers, topics..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            sx={{
              width: '100%',
              boxSizing: 'border-box',
              pl: '56px',
              pr: 'var(--space-lg)',
              py: 'var(--space-md)',
              border: searchFocused
                ? '2px solid var(--color-primary)'
                : '2px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-xl)',
              fontSize: 16,
              background: 'var(--md3-surface-container-lowest)',
              outline: 'none',
              transition: 'border-color 200ms',
              fontFamily: 'inherit',
              color: 'var(--md3-on-surface)',
              '&::placeholder': { color: 'var(--md3-on-surface-variant)' },
            }}
          />
        </Box>

        {/* ── Section 2: Two-column layout ── */}
        <Box sx={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'flex-start' }}>
          {/* ── Left Column: Filters Panel ── */}
          <Box
            sx={{
              width: 300,
              flexShrink: 0,
              position: 'sticky',
              top: '88px',
              background: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-xl)',
              p: 'var(--space-lg)',
            }}
          >
            {/* Filter Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 'var(--space-lg)',
              }}
            >
              <Typography
                component="h3"
                sx={{ fontSize: 16, fontWeight: 700, color: 'var(--md3-on-surface)', m: 0 }}
              >
                Filters
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: 'var(--color-primary)',
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { textDecoration: 'underline', background: 'transparent' },
                }}
              >
                Reset Filters
              </Button>
            </Box>

            {/* Filter Sections */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {/* Date Range */}
              <Box>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-sm)',
                  }}
                >
                  Date Range
                </Typography>
                <Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{
                    borderRadius: 'var(--radius-md)',
                    fontSize: 13,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--md3-outline-variant)',
                    },
                  }}
                >
                  <MenuItem value="last30">Last 30 days</MenuItem>
                  <MenuItem value="last7">Last 7 days</MenuItem>
                  <MenuItem value="quarter">This quarter</MenuItem>
                  <MenuItem value="custom">Custom range...</MenuItem>
                </Select>
              </Box>

              {/* Speakers */}
              <Box>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-xs)',
                  }}
                >
                  Speakers
                </Typography>
                {['Sarah Jenkins', 'David Chen', 'Alex Rivera'].map((speaker) => (
                  <FormControlLabel
                    key={speaker}
                    control={
                      <Checkbox
                        size="small"
                        sx={{
                          color: 'var(--md3-outline)',
                          '&.Mui-checked': { color: 'var(--color-primary)' },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 13, color: 'var(--md3-on-surface)' }}>
                        {speaker}
                      </Typography>
                    }
                    sx={{ display: 'flex', m: 0 }}
                  />
                ))}
              </Box>

              {/* Meeting Type */}
              <Box>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-sm)',
                  }}
                >
                  Meeting Type
                </Typography>
                <Select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{
                    borderRadius: 'var(--radius-md)',
                    fontSize: 13,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--md3-outline-variant)',
                    },
                  }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="internal">Internal Review</MenuItem>
                  <MenuItem value="client">Client Pitch</MenuItem>
                  <MenuItem value="strategic">Strategic Sync</MenuItem>
                </Select>
              </Box>

              {/* Sentiment */}
              <Box>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-sm)',
                  }}
                >
                  Sentiment
                </Typography>
                <Box sx={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {sentiments.map((s) => (
                    <Box
                      key={s}
                      onClick={() => setActiveSentiment(activeSentiment === s ? null : s)}
                      sx={{
                        px: '12px',
                        py: '4px',
                        background: 'var(--md3-surface-container)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        border:
                          activeSentiment === s
                            ? '1px solid var(--color-primary)'
                            : '1px solid transparent',
                        color: 'var(--md3-on-surface)',
                        transition: 'border-color 150ms',
                        userSelect: 'none',
                        '&:hover': { borderColor: 'var(--color-primary)' },
                      }}
                    >
                      {s}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Top Keywords */}
              <Box>
                <Typography
                  component="label"
                  sx={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-sm)',
                  }}
                >
                  Top Keywords
                </Typography>
                <Box sx={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  {keywords.map((kw) => (
                    <Box
                      key={kw}
                      sx={{
                        background: 'var(--md3-primary-fixed)',
                        color: 'var(--md3-on-primary-fixed, #21005d)',
                        fontSize: 10,
                        px: '8px',
                        py: '2px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {kw}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Advanced Search Button */}
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 'var(--space-xl)',
                py: '12px',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'var(--md3-surface-container-low)',
                  borderColor: 'var(--color-primary)',
                },
              }}
            >
              Advanced Search
            </Button>
          </Box>

          {/* ── Right Column: Results ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Results Header Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 'var(--space-lg)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <Typography
                  component="h3"
                  sx={{ fontSize: 16, fontWeight: 700, color: 'var(--md3-on-surface)', m: 0 }}
                >
                  247 matches
                </Typography>
                <Button
                  variant="text"
                  startIcon={
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                      bookmark
                    </span>
                  }
                  sx={{
                    color: 'var(--color-primary)',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'none',
                    px: '12px',
                    py: '6px',
                    borderRadius: 'var(--radius-md)',
                    '&:hover': { background: 'var(--md3-primary-fixed)' },
                  }}
                >
                  Save Search
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <Typography sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}>
                  Sort by:
                </Typography>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  variant="standard"
                  disableUnderline
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    '& .MuiSelect-select': { py: 0 },
                  }}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Result Cards */}
            <Box sx={{ display: 'grid', gap: 'var(--space-md)' }}>
              {RESULT_CARDS.map((card, idx) => (
                <ResultCard
                  key={idx}
                  card={card}
                  hovered={hoveredCard === idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              ))}
            </Box>

            {/* Pagination Footer */}
            <Box
              sx={{
                pt: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-md)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                {/* Prev */}
                <Box
                  component="button"
                  onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--md3-outline-variant)',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--md3-on-surface-variant)',
                    '&:hover': { background: 'var(--md3-surface-container)' },
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    chevron_left
                  </span>
                </Box>

                {pages.map((p) => (
                  <Box
                    key={p}
                    component="button"
                    onClick={() => setActivePage(p)}
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: activePage === p ? 700 : 500,
                      background: activePage === p ? 'var(--color-primary)' : 'transparent',
                      color: activePage === p ? '#fff' : 'var(--md3-on-surface)',
                      '&:hover': {
                        background:
                          activePage === p
                            ? 'var(--color-primary)'
                            : 'var(--md3-surface-container)',
                      },
                    }}
                  >
                    {p}
                  </Box>
                ))}

                {/* Next */}
                <Box
                  component="button"
                  onClick={() => setActivePage((p) => Math.min(5, p + 1))}
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--md3-outline-variant)',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--md3-on-surface-variant)',
                    '&:hover': { background: 'var(--md3-surface-container)' },
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                    chevron_right
                  </span>
                </Box>
              </Box>

              <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'var(--md3-on-surface-variant)' }}>
                Showing 1-10 of 247 results
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}

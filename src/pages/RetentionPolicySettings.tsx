import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AppLayout from '../components/layout/AppLayout';

/* ─────────────────────────────── types ─────────────────────────────── */

type PolicyStatus = 'Active' | 'Draft' | 'Deprecated';

interface PolicyRow {
  iconName: string;
  iconBg: string;
  iconColor: string;
  name: string;
  subtitle: string;
  retention: string;
  archivalLabel: string;
  archivalIcon: string;
  status: PolicyStatus;
  updatedDate: string;
  updatedBy: string;
}

/* ──────────────────────────────── data ─────────────────────────────── */

const STATUS_STYLES: Record<PolicyStatus, { bg: string; color: string; dot: string }> = {
  Active: { bg: '#dcfce7', color: '#166534', dot: '#16a34a' },
  Draft: { bg: '#fed7aa', color: '#9a3412', dot: '#ea580c' },
  Deprecated: { bg: '#f3f4f6', color: '#6b7280', dot: '#9ca3af' },
};

const POLICY_ROWS: PolicyRow[] = [
  {
    iconName: 'videocam',
    iconBg: 'var(--md3-primary-fixed)',
    iconColor: 'var(--color-primary)',
    name: 'Meeting Recordings',
    subtitle: 'Standard MP4/WebM storage',
    retention: '2 Years',
    archivalLabel: 'Move to Glacier S3',
    archivalIcon: 'archive',
    status: 'Active',
    updatedDate: 'Oct 12, 2023',
    updatedBy: 'Alex Rivera',
  },
  {
    iconName: 'chat_bubble',
    iconBg: 'var(--md3-tertiary-fixed)',
    iconColor: 'var(--md3-tertiary)',
    name: 'Transcripts',
    subtitle: 'JSON & Plaintext records',
    retention: '7 Years',
    archivalLabel: 'Permanent Deletion',
    archivalIcon: 'cloud_off',
    status: 'Active',
    updatedDate: 'Jan 05, 2024',
    updatedBy: 'Sarah Chen',
  },
  {
    iconName: 'assignment',
    iconBg: 'var(--md3-secondary-fixed)',
    iconColor: 'var(--md3-secondary)',
    name: 'Action Items',
    subtitle: 'Extracted task assignments',
    retention: 'Indefinite',
    archivalLabel: 'Hot Storage',
    archivalIcon: 'database',
    status: 'Draft',
    updatedDate: 'Mar 18, 2024',
    updatedBy: 'Mike Ross',
  },
  {
    iconName: 'psychology',
    iconBg: 'var(--md3-outline-variant)',
    iconColor: 'var(--md3-on-surface-variant)',
    name: 'Insight Metadata',
    subtitle: 'AI-generated summary tags',
    retention: '1 Year',
    archivalLabel: 'Permanent Deletion',
    archivalIcon: 'cloud_off',
    status: 'Deprecated',
    updatedDate: 'Dec 20, 2022',
    updatedBy: 'System Admin',
  },
];

/* ─────────────────────────── sub-components ────────────────────────── */

function StatusBadge({ status }: { status: PolicyStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        px: '10px',
        py: '3px',
        borderRadius: 'var(--radius-full)',
        background: s.bg,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: s.dot,
          flexShrink: 0,
        }}
      />
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: s.color }}>
        {status}
      </Typography>
    </Box>
  );
}

function PolicyTableRow({ row }: { row: PolicyRow }) {
  const [hovered, setHovered] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);

  return (
    <TableRow
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        background: hovered ? 'var(--md3-surface-container-lowest)' : 'transparent',
        transition: 'background 150ms',
        '& td': { borderBottom: '1px solid var(--md3-outline-variant)' },
      }}
    >
      {/* Data Type */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: row.iconBg,
              color: row.iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {row.iconName}
            </span>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'var(--md3-on-surface)' }}>
              {row.name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}>
              {row.subtitle}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Retention Period */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <Box
          sx={{
            display: 'inline-block',
            px: 'var(--space-md)',
            py: '1px',
            background: 'var(--md3-surface-container)',
            borderRadius: 'var(--radius-full)',
            fontSize: 13,
            color: 'var(--md3-on-surface)',
          }}
        >
          {row.retention}
        </Box>
      </TableCell>

      {/* Archival Rule */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 16, color: 'var(--md3-on-surface-variant)' }}
          >
            {row.archivalIcon}
          </span>
          <Typography sx={{ fontSize: 13, color: 'var(--md3-on-surface)' }}>
            {row.archivalLabel}
          </Typography>
        </Box>
      </TableCell>

      {/* Status */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <StatusBadge status={row.status} />
      </TableCell>

      {/* Last Updated */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <Typography sx={{ fontSize: 13, color: 'var(--md3-on-surface)', fontWeight: 500 }}>
          {row.updatedDate}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}>
          by {row.updatedBy}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell sx={{ px: 'var(--space-lg)', py: 'var(--space-md)', borderBottom: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 200ms',
          }}
        >
          {/* Edit */}
          <Box
            component="button"
            onMouseDown={() => setEditPressed(true)}
            onMouseUp={() => setEditPressed(false)}
            onMouseLeave={() => setEditPressed(false)}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--color-primary)',
              transform: editPressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 100ms',
              '&:hover': { background: 'var(--md3-primary-fixed)' },
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              edit
            </span>
          </Box>
          {/* Delete */}
          <Box
            component="button"
            onMouseDown={() => setDeletePressed(true)}
            onMouseUp={() => setDeletePressed(false)}
            onMouseLeave={() => setDeletePressed(false)}
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-sm)',
              background: 'transparent',
              cursor: 'pointer',
              color: '#ba1a1a',
              transform: deletePressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 100ms',
              '&:hover': { background: 'var(--md3-error-container)' },
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              delete
            </span>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
}

/* ──────────────────────────── main component ───────────────────────── */

export default function RetentionPolicySettings() {
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activePage, setActivePage] = useState(1);
  const [addPressed, setAddPressed] = useState(false);
  const [generatePressed, setGeneratePressed] = useState(false);

  const TABLE_HEADERS = [
    'Data Type',
    'Retention Period',
    'Archival Rule',
    'Status',
    'Last Updated',
    'Actions',
  ];

  const paginationPages = [1, 2, 3, '...', 25];

  return (
    <AppLayout activeNav="compliance">
      <Box sx={{ p: 'var(--space-2xl)', maxWidth: '1280px', mx: 'auto' }}>
        {/* ── Page Header ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
            mb: 'var(--space-xl)',
          }}
        >
          <Box>
            <Typography
              component="h1"
              sx={{
                fontSize: 28,
                fontWeight: 800,
                color: 'var(--md3-on-surface)',
                m: 0,
                mb: 'var(--space-xs)',
                lineHeight: 1.2,
              }}
            >
              Retention Policy Settings
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: 'var(--md3-on-surface-variant)',
                maxWidth: 672,
                lineHeight: 1.6,
              }}
            >
              Manage how long your organization retains meeting data and configure automated
              archival or deletion rules to stay compliant.
            </Typography>
          </Box>

          <Button
            onMouseDown={() => setAddPressed(true)}
            onMouseUp={() => setAddPressed(false)}
            onMouseLeave={() => setAddPressed(false)}
            startIcon={
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                add_circle
              </span>
            }
            sx={{
              flexShrink: 0,
              background: 'var(--md3-secondary)',
              color: '#fff',
              px: 'var(--space-lg)',
              py: 'var(--space-sm)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: 13,
              textTransform: 'none',
              boxShadow: 'var(--shadow-md)',
              transform: addPressed ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 100ms, filter 150ms',
              '&:hover': {
                background: 'var(--md3-secondary)',
                filter: 'brightness(1.15)',
                boxShadow: 'var(--shadow-md)',
              },
            }}
          >
            Add Policy
          </Button>
        </Box>

        {/* ── Sticky Control Bar ── */}
        <Box
          sx={{
            position: 'sticky',
            top: 64,
            zIndex: 30,
            background: 'var(--md3-surface, #fef7ff)',
            border: '1px solid var(--md3-outline-variant)',
            borderRadius: 'var(--radius-md)',
            p: 'var(--space-md)',
            mb: 'var(--space-lg)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            {/* Filter input */}
            <Box sx={{ position: 'relative' }}>
              <span
                className="material-symbols-outlined"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 18,
                  color: 'var(--md3-on-surface-variant)',
                  pointerEvents: 'none',
                }}
              >
                filter_list
              </span>
              <Box
                component="input"
                value={filterText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilterText(e.target.value)
                }
                placeholder="Filter by Data Type..."
                sx={{
                  pl: '36px',
                  pr: '12px',
                  py: '8px',
                  border: '1px solid var(--md3-outline-variant)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'inherit',
                  color: 'var(--md3-on-surface)',
                  background: 'var(--md3-surface-container-lowest)',
                  minWidth: 220,
                  '&:focus': { borderColor: 'var(--color-primary)' },
                  '&::placeholder': { color: 'var(--md3-on-surface-variant)' },
                }}
              />
            </Box>

            {/* Status select */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              sx={{
                background: 'var(--md3-surface-container-lowest)',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                minWidth: 150,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--md3-outline-variant)',
                },
              }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="legacy">Legacy</MenuItem>
            </Select>
          </Box>

          {/* Sort */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Typography sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}>
              Sort by:
            </Typography>
            <Button
              endIcon={
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  arrow_downward
                </span>
              }
              sx={{
                color: 'var(--color-primary)',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                '&:hover': { background: 'transparent', textDecoration: 'underline' },
              }}
            >
              Last Updated
            </Button>
          </Box>
        </Box>

        {/* ── Policy Table Card ── */}
        <Box
          sx={{
            background: 'var(--md3-surface-container-lowest)',
            border: '1px solid var(--md3-outline-variant)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'var(--md3-surface-container-low)' }}>
                {TABLE_HEADERS.map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      px: 'var(--space-lg)',
                      py: 'var(--space-md)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--md3-on-surface-variant)',
                      borderBottom: '1px solid var(--md3-outline-variant)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {POLICY_ROWS.map((row) => (
                <PolicyTableRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>

          {/* Table Pagination Footer */}
          <Box
            sx={{
              background: 'var(--md3-surface-container-low)',
              px: 'var(--space-lg)',
              py: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--md3-outline-variant)',
            }}
          >
            <Typography sx={{ fontSize: 13, color: 'var(--md3-on-surface-variant)' }}>
              Showing{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'var(--md3-on-surface)' }}>
                1-10
              </Box>{' '}
              of{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'var(--md3-on-surface)' }}>
                247
              </Box>{' '}
              policies
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Prev */}
              <Box
                component="button"
                disabled
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--md3-outline-variant)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'transparent',
                  cursor: 'not-allowed',
                  color: 'var(--md3-outline-variant)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  chevron_left
                </span>
              </Box>

              {paginationPages.map((p, i) => (
                <Box
                  key={i}
                  component="button"
                  onClick={() => typeof p === 'number' && setActivePage(p)}
                  sx={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--md3-outline-variant)',
                    borderRadius: 'var(--radius-sm)',
                    background:
                      p === activePage ? 'var(--color-primary)' : 'transparent',
                    color:
                      p === activePage
                        ? '#fff'
                        : 'var(--md3-on-surface)',
                    fontSize: 12,
                    fontWeight: p === activePage ? 700 : 400,
                    cursor: typeof p === 'number' ? 'pointer' : 'default',
                    '&:hover':
                      typeof p === 'number'
                        ? { background: p === activePage ? 'var(--color-primary)' : 'var(--md3-surface-container)' }
                        : {},
                  }}
                >
                  {p}
                </Box>
              ))}

              {/* Next */}
              <Box
                component="button"
                onClick={() => setActivePage((prev) => prev + 1)}
                sx={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--md3-outline-variant)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--md3-on-surface-variant)',
                  '&:hover': { background: 'var(--md3-surface-container)' },
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                  chevron_right
                </span>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── Bento Info Section ── */}
        <Box
          sx={{
            mt: 'var(--space-2xl)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 'var(--space-lg)',
          }}
        >
          {/* Left Card – Compliance Overview */}
          <Box
            sx={{
              background: 'var(--md3-surface-container-lowest)',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-md)',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--md3-on-surface)',
                m: 0,
                mb: 'var(--space-lg)',
              }}
            >
              Compliance Overview
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
              {/* Storage Optimization */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-xs)',
                  }}
                >
                  Storage Optimization
                </Typography>
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    lineHeight: 1.1,
                    mb: '4px',
                  }}
                >
                  1.2 TB
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 14, color: 'var(--color-success)' }}
                  >
                    trending_down
                  </span>
                  <Typography sx={{ fontSize: 12, color: 'var(--color-success)' }}>
                    14% reduction this month
                  </Typography>
                </Box>
              </Box>

              {/* Data Disposal Rate */}
              <Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--md3-on-surface-variant)',
                    mb: 'var(--space-xs)',
                  }}
                >
                  Data Disposal Rate
                </Typography>
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: 'var(--md3-secondary)',
                    lineHeight: 1.1,
                    mb: '4px',
                  }}
                >
                  98.2%
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'var(--md3-on-surface-variant)' }}>
                  Verified by automated purge
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Card – Audit Preparedness */}
          <Box
            sx={{
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              p: 'var(--space-lg)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 180,
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                component="h3"
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  m: 0,
                  mb: 'var(--space-sm)',
                }}
              >
                Audit Preparedness
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.5,
                  mb: 'var(--space-lg)',
                }}
              >
                Your current retention configurations meet GDPR and SOC2 requirements.
                Review the generated report for any gaps or recommendations.
              </Typography>
            </Box>

            <Button
              onMouseDown={() => setGeneratePressed(true)}
              onMouseUp={() => setGeneratePressed(false)}
              onMouseLeave={() => setGeneratePressed(false)}
              fullWidth
              sx={{
                position: 'relative',
                zIndex: 1,
                py: '8px',
                background: generatePressed
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'none',
                transform: generatePressed ? 'scale(0.97)' : 'scale(1)',
                transition: 'background 150ms, transform 100ms',
                '&:hover': {
                  background: 'rgba(255,255,255,0.3)',
                },
              }}
            >
              Generate Report
            </Button>

            {/* Decorative icon */}
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 120,
                color: 'rgba(255,255,255,0.2)',
                position: 'absolute',
                bottom: -32,
                right: -32,
                transform: 'rotate(12deg)',
                lineHeight: 1,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              verified
            </span>
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}

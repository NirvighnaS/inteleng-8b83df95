import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

type NavItem = {
  id: string;
  label: string;
  icon: string;
  path: string;
};

const navItems: NavItem[] = [
  { id: 'meetings', label: 'Meetings', icon: 'video_call', path: '/meetings' },
  { id: 'content', label: 'Content', icon: 'description', path: '/content/search' },
  { id: 'decisions', label: 'Decisions', icon: 'gavel', path: '/decisions' },
  { id: 'tasks', label: 'Tasks', icon: 'task_alt', path: '/tasks' },
  { id: 'strategy', label: 'Strategy', icon: 'rocket_launch', path: '/strategy' },
  { id: 'operations', label: 'Operations', icon: 'settings_suggest', path: '/operations' },
  { id: 'knowledge', label: 'Knowledge', icon: 'auto_stories', path: '/knowledge' },
  { id: 'admin', label: 'Admin', icon: 'group', path: '/admin' },
  { id: 'audit', label: 'Audit', icon: 'receipt_long', path: '/audit' },
  { id: 'compliance', label: 'Compliance', icon: 'verified_user', path: '/compliance' },
];

interface AppLayoutProps {
  children: React.ReactNode;
  activeNav: string;
}

export default function AppLayout({ children, activeNav }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'var(--md3-background)' }}>
      {/* TopNav Header */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '64px',
          zIndex: 50,
          bgcolor: 'var(--md3-surface-container-lowest)',
          borderBottom: '1px solid var(--md3-outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 'var(--space-lg)',
        }}
      >
        {/* Left: Brand + Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <Box component="h1" sx={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--md3-on-surface)', m: 0, whiteSpace: 'nowrap' }}>
            Inteleng - v1.0.0
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 'var(--space-xl)',
              alignItems: 'center',
              border: '1px solid var(--md3-outline-variant)',
              borderRadius: 'var(--radius-full)',
              px: 'var(--space-md)',
              py: 'var(--space-xs)',
              bgcolor: 'var(--md3-surface-container-low)',
              width: '256px',
              gap: 'var(--space-sm)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--md3-on-surface-variant)' }}>search</span>
            <Box
              component="input"
              type="text"
              placeholder="Search transcripts..."
              sx={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 'var(--font-size-body)',
                color: 'var(--md3-on-surface)',
                width: '100%',
                fontFamily: 'var(--font-primary)',
                '&::placeholder': { color: 'var(--md3-on-surface-variant)' },
              }}
            />
          </Box>
        </Box>

        {/* Right: Actions + Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          {['notifications', 'help', 'settings'].map((icon) => (
            <Box
              key={icon}
              component="button"
              aria-label={icon}
              sx={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                p: 'var(--space-sm)',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--md3-on-surface-variant)',
                transition: 'background 200ms',
                '&:hover': { bgcolor: 'var(--md3-surface-container)' },
                '&:focus-visible': { outline: '2px solid var(--color-primary)', outlineOffset: '2px' },
              }}
            >
              <span className="material-symbols-outlined">{icon}</span>
            </Box>
          ))}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              border: '1px solid var(--md3-outline)',
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdaAKhkIBx6VfFRE2Ury8KbeKX4ghXNlOTNadIzgf4PnZw8-qGP-hphr5ODJeIhud1-XEW7SHfxSvs-ZIt1QnJjvgUf7ZlKDLLmBa6ApAeYiQVc7xt-HOcd1H6OfwE4Odz3XLTQ76YiHs4jsIbxFn5C_KxHhyXTO6qpsl2xkK4CSrKfaBZn_u2sf2HKvDMESG8ULK-SvDhuyEGtaaXpdMFEg3QkJ7qudxBWyoB0qLu8COu0icxr4NPBgL6Ok3_HtWL0el5uO24WU"
              alt="User profile"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          position: 'fixed',
          left: 0,
          top: '64px',
          width: '240px',
          height: 'calc(100vh - 64px)',
          zIndex: 40,
          bgcolor: 'var(--md3-surface-container-lowest)',
          borderRight: '1px solid var(--md3-outline-variant)',
          display: 'flex',
          flexDirection: 'column',
          py: 'var(--space-md)',
          px: 'var(--space-sm)',
          overflowY: 'auto',
        }}
        className="no-scrollbar"
      >
        {/* Workspace Header */}
        <Box sx={{ mb: 'var(--space-lg)', px: 'var(--space-sm)' }}>
          <Box component="h2" sx={{ fontSize: 'var(--font-size-h4)', fontWeight: 700, color: 'var(--color-primary)', m: 0 }}>
            Inteleng Workspace
          </Box>
          <Box component="p" sx={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--md3-on-surface-variant)', opacity: 0.7, m: 0, mt: '2px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Enterprise Tier
          </Box>
        </Box>

        {/* Navigation */}
        <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <Box
                key={item.id}
                component="a"
                href={item.path}
                onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(item.path); }}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  py: 'var(--space-sm)',
                  px: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 200ms',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  bgcolor: isActive ? '#eaddff' : 'transparent',
                  color: isActive ? '#25005a' : 'var(--md3-on-surface-variant)',
                  fontWeight: isActive ? 700 : 400,
                  '&:hover': {
                    bgcolor: isActive ? '#eaddff' : 'var(--md3-surface-container-low)',
                    color: isActive ? '#25005a' : 'var(--md3-on-surface)',
                  },
                  '&:focus-visible': { outline: '2px solid var(--color-primary)', outlineOffset: '2px' },
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
                <Box component="span" sx={{ fontSize: 'var(--font-size-label)', fontWeight: 600, letterSpacing: '0.5px' }}>
                  {item.label}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Bottom Links */}
        <Box sx={{ mt: 'auto', borderTop: '1px solid var(--md3-outline-variant)', pt: 'var(--space-md)', px: 'var(--space-sm)' }}>
          {[
            { label: 'Help Center', icon: 'help' },
            { label: 'Support', icon: 'contact_support' },
          ].map((item) => (
            <Box
              key={item.label}
              component="a"
              href="#"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                py: 'var(--space-sm)',
                px: 'var(--space-md)',
                color: 'var(--md3-on-surface-variant)',
                textDecoration: 'none',
                fontSize: 'var(--font-size-label)',
                fontWeight: 600,
                letterSpacing: '0.5px',
                borderRadius: 'var(--radius-md)',
                transition: 'color 200ms',
                '&:hover': { color: 'var(--md3-on-surface)' },
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
              {item.label}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: '240px',
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'var(--md3-background)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

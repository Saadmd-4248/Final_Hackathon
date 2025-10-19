
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { Avatar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Import your pages
import Dashboard from './Dashboard';
import ProfilePage from './MyProfile';
import AddMember from './Addmember';

// ✅ Sidebar navigation
const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'tasks', title: 'Add Member', icon: <AddTaskIcon /> },
  { segment: 'profile', title: 'Profile', icon: <AccountCircleIcon /> },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

// ✅ Theme setup
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// ✅ Page Routing within Dashboard Layout
function DemoPageContent({ pathname }) {
  const navigate = useNavigate();

  const logOutEmployee = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    toast.warning('Logged out successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  switch (pathname) {
    case '/dashboard':
      return <Dashboard />;

    case '/tasks':
      return <AddMember />;

    case '/profile':
      return <ProfilePage />;

    case '/logout':
      return (
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            You have been logged out
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for using the Employee Panel. Please log in again to continue.
          </Typography>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            onClick={logOutEmployee}
          >
            Go to Login
          </button>
        </Box>
      );

    default:
      return (
        <Box sx={{ py: 4 }}>
          <Typography>404 - Page not found</Typography>
        </Box>
      );
  }
}

export default function DashboardLayoutBranding(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const getuser = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <DemoProvider window={demoWindow}>
        <AppProvider
          navigation={NAVIGATION}
          branding={{
            logo: (
              <Avatar
                alt={getuser.name}
                sx={{ fontSize: '2rem', paddingBottom: '0.2rem' }}
                src="/static/images/avatar/2.jpg"
              />
            ),
            title: 'Welcome Healty Mate',
            homeUrl: '/dashboard',
          }}
          router={router}
          theme={demoTheme}
          window={demoWindow}
        >
          <DashboardLayout>
            <DemoPageContent pathname={router.pathname} />
          </DashboardLayout>
        </AppProvider>
      </DemoProvider>
    </>
  );
}

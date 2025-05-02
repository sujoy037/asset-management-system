
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, Typography, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import UploadFileIcon from '@mui/icons-material/UploadFile';
//import AddIcon from '@mui/icons-material/Add'; // Example submenu icon
import EditIcon from '@mui/icons-material/Edit'; // Example submenu icon
import DeleteIcon from '@mui/icons-material/Delete'; // Example submenu icon
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';


const Sidebar = ({ role, uer_nm, isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // ISD Dashboard
    // Define role-based cards-- (to show when on Role-related pages)
    const roleCards = [
        { title: 'Role', path: '/assign-roles-card', color: 'rgb(34, 153, 84)', Icon: PersonIcon },


    ];
    // Define asset-based cards (to show when on Role-related pages)
    const assetCards = [

        { title: 'Assets', path: '/assets', color: 'rgb(34, 153, 84)', Icon: WebAssetIcon },

    ];
    // Define complaints-based cards (to show when on Role-related pages)
    const complaintsCards = [

        { title: 'Complaint', path: '/complaints', color: 'rgb(34, 153, 84)', Icon: ReportProblemIcon },

    ];
    // Define report-based cards (to show when on Role-related pages)
    const reportCards = [

        { title: 'Report', path: '/reports', color: 'rgb(34, 153, 84)', Icon: SummarizeIcon },

    ];
    // Define history-based cards (to show when on Role-related pages)
    const historyCards = [

        { title: 'History', path: '/history', color: 'rgb(34, 153, 84)', Icon: HistoryIcon },

    ];
    // Define status-based cards (to show when on Role-related pages)
    const statusCards = [

        { title: 'Status', path: '/status', color: 'rgb(34, 153, 84)', Icon: AssignmentIcon },

    ];
   


    // Technician Dashboard
// Define role-based cards (for Technician)
// Define asset-based cards (for Technician)
const regTechCards = [
    { title: 'Register Technician', path: '/register-technician', color: 'rgb(34, 153, 84)', Icon: EngineeringIcon },
];

// Define complaints-based cards (for Technician)
const complaintsTechCards = [
    { title: 'Complaints List', path: '/technician-complaints', color: 'rgb(34, 153, 84)', Icon: ReportProblemIcon },
];

// Define report-based cards (for Technician)
const reportTechCards = [
    { title: 'Report', path: '/technician-reports', color: 'rgb(34, 153, 84)', Icon: SummarizeIcon },
];

// Define assign technician-based cards (for Technician)
const assignTechnicianCards = [
    { title: 'Assign Technician', path: '/assign-technician', color: 'rgb(34, 153, 84)', Icon: EngineeringIcon },
];


    // Define the main role-based menu
    const roleBasedMenu = {
        Admin: [
            { text: 'Admin Dashboard', icon: <HomeIcon />, path: '/admin-dashboard' },
            {
                text: 'Manage Roles',
                icon: <PersonIcon />,
                path: '/manage-roles',
                submenu: [
                    { text: 'Add Role', path: '/manage-roles/add-role', icon: <PersonAddIcon /> }, // Submenu icon
                    { text: 'Edit Role', path: '/manage-roles/edit-role', icon: <EditIcon /> }, // Submenu icon
                    { text: 'Delete Role', path: '/manage-roles/delete-role', icon: <DeleteIcon /> }, // Submenu icon
                ],
            },
            { text: 'User List', icon: <AccountCircleIcon />, path: '/user-list' },
            {
                text: 'Assign Roles', icon: <PersonIcon />, path: '/roles',
                submenu: [
                    { text: 'User Role Create ', path: '/assign-roles', icon: <PersonAddIcon /> },
                ],
            },
            {
                text: 'Assets', icon: <WebAssetIcon />, path: '/assets',
                submenu: [
                    { text: 'Assets File  Upload ', icon: <UploadFileIcon />, path: '/upload-csv' },
                    { text: 'Assets List', path: '/total-assets', icon: <ListIcon /> },
                    { text: 'Current Own Asset ', path: '/create-assigned-asset', icon: <EditIcon /> }
                ],
            },
            { text: 'Raise Complaint', icon: <ReportProblemIcon />, path: '/assets', },
            { text: 'Track Complaint', icon: <ContentPasteSearchIcon />, path: '/assets', },
            { text: 'Settings', icon: <SettingsIcon />, path: '/assets', },
        ],
        ISD: [
            { text: 'ISD Home', icon: <HomeIcon />, path: '/isd-dashboard' },
            { text: 'Roles', icon: <PersonIcon />, path: '/assign-roles-card' },
            { text: 'Assets', icon: <WebAssetIcon />, path: '/assets', },
            { text: 'Complaint', icon: <ReportProblemIcon />, path: '/complaints', },
            { text: 'Report', icon: <SummarizeIcon />, path: '/reports', },
            { text: 'History', icon: <HistoryIcon />, path: '/history', },
            { text: 'Settings', icon: <SettingsIcon />, path: '/settings', },
        ],
        Employee: [
            { text: 'Home', icon: <HomeIcon />, path: '/employee-dashboard' },
            { text: 'Tasks', icon: <ListAltIcon />, path: '/tasks' },
        ],
        Technician: [
            { text: 'Home', icon: <HomeIcon />, path: '/technician-dashboard' },
            { text: 'Register Technician', icon: <EngineeringIcon />, path: '/register-technician' },
            { text: 'Complaints List', icon: <ReportProblemIcon />, path: '/technician-complaints' },
            { text: 'Report', icon: <SummarizeIcon />, path: '/technician-reports' },
            { text: 'Assign Technician', icon: <EngineeringIcon />, path: '/assign-technician' },
        ],
    };

    // Check if we are on a role-related page
    const isRolePage = location.pathname.includes('/assign-roles') ||
        location.pathname.includes('/user-roles');
    // Check if we are on a asset-related page
    const isAssetPage = location.pathname.includes('/assets') ||
        location.pathname.includes('/user-roles') ||
        location.pathname.includes('/upload') ||
        location.pathname.includes('/assets-assign') ||
        location.pathname.includes('/transfer-assigned-asset') ||
        location.pathname.includes('/total-assets') ||
        location.pathname.includes('/manage-roles/delete-role') ||
        location.pathname.includes('/create-assigned-asset') ||
        location.pathname.includes('/status-assets-allocation') ||
        location.pathname.includes('/manage-roles');
    // Check if we are on a complaints-related page
    const iscomplaintsPage = location.pathname.includes('/complaints') ||
        location.pathname.includes('/raise-complaints') ||
        location.pathname.includes('/track-complaint');
    // Check if we are on a reports-related page
    const isreportPage = location.pathname.includes('/reports') ||
        location.pathname.includes('/asset-usages-report') ||
        location.pathname.includes('/asset-complain-report') ||
        location.pathname.includes('/employee-transfer-report') ||
        location.pathname.includes('/chargwise-asset-use-report') ||
        location.pathname.includes('/chargwise-asset-complaint-report') ||
        location.pathname.includes('/chargwise-asset-transfer-report') ||
        location.pathname.includes('/asset-creation-report') ||
        location.pathname.includes('/isd-creation-report') ||
        location.pathname.includes('/admin-creation-report') ||
        location.pathname.includes('/employee-creation-report');
    // Check if we are on a history-related page
    const ishistoryPage = location.pathname.includes('/history') ||
        location.pathname.includes('/replacement-history') ||
        location.pathname.includes('/assign-history') ||
        location.pathname.includes('/complaint-history') ||
        location.pathname.includes('/admin-creation-history') ||
        location.pathname.includes('/isd-creation-history') ||
        location.pathname.includes('/employee-creation-history') ||
        location.pathname.includes('/admin-transfer-history') ||
        location.pathname.includes('/isd-transfer-history') ||
        location.pathname.includes('/employee-transfer-history') ||
        location.pathname.includes('/asset-repair-history');
    // Check if we are on a status-related page
    const isstatusPage = location.pathname.includes('/status') ||
        location.pathname.includes('/replacement-Status') ||
        location.pathname.includes('/assign-Status') ||
        location.pathname.includes('/complaint-Status') ||
        location.pathname.includes('/admin-creation-Status') ||
        location.pathname.includes('/isd-creation-Status') ||
        location.pathname.includes('/employee-creation-Status') ||
        location.pathname.includes('/admin-transfer-Status') ||
        location.pathname.includes('/isd-transfer-Status') ||
        location.pathname.includes('/employee-transfer-Status') ||
        location.pathname.includes('/asset-repair-Status');


// Check if we are on a Technician-related page
const isTechnicianPage = location.pathname.includes('/technician-complaints');
const isRegisterTechnician = location.pathname.includes('/register-technician');
const isAssignTechnician = location.pathname.includes('/assign-technician');
const isTechnicianReport = location.pathname.includes('/technician-reports');
    

    // Get the correct menu items based on role and page
    const menuItems = roleBasedMenu[role] || [];

    return (
        <Box>
            <Drawer
                variant="temporary"
                open={isOpen}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: 'rgb(8, 160, 219)',
                        color: 'white',
                    },
                }}
            >
                <Toolbar sx={{ backgroundColor: '#0D47A1' }} />
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            fontSize: '1.2rem',
                            bgcolor: '#1565C0',
                        }}
                    >
                        {uer_nm ? uer_nm.charAt(0).toUpperCase() : '?'}
                    </Avatar>
                    <Typography variant="h8" sx={{ color: 'white' }}>
                        {uer_nm || 'User'}
                    </Typography>
                </Box>
    
                {/* Render specific cards when on a related page */}
                {isRolePage ? (
                    <List>
                        {roleCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : isAssetPage ? (
                    <List>
                        {assetCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : iscomplaintsPage ? (
                    <List>
                        {complaintsCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : isreportPage ? (
                    <List>
                        {reportCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : ishistoryPage ? (
                    <List>
                        {historyCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : isstatusPage ? (
                    <List>
                        {statusCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                ) : isTechnicianPage ? (
                    // Render Technician-specific cards when on a Technician-related page
                    <List>
                        {complaintsTechCards.map((card, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(card.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    backgroundColor: card.color,
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>
                                    <card.Icon />
                                </ListItemIcon>
                                <ListItemText primary={card.title} />
                            </ListItem>
                        ))}
                    </List>
                     ) : isRegisterTechnician ? (
                        // Render Technician-specific cards when on a Technician-related page
                        <List>
                            {regTechCards.map((card, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => {
                                        navigate(card.path);
                                        toggleSidebar();
                                    }}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: card.color,
                                        '&:hover': { backgroundColor: '#1565C0' },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        <card.Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={card.title} />
                                </ListItem>
                            ))}
                        </List>
                        ) : isAssignTechnician ? (
                            // Render Technician-specific cards when on a Technician-related page
                            <List>
                                {assignTechnicianCards.map((card, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={() => {
                                            navigate(card.path);
                                            toggleSidebar();
                                        }}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: card.color,
                                            '&:hover': { backgroundColor: '#1565C0' },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            <card.Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={card.title} />
                                    </ListItem>
                                ))}
                            </List>
                              ) : isTechnicianReport ? (
                                // Render Technician-specific cards when on a Technician-related page
                                <List>
                                    {reportTechCards.map((card, index) => (
                                        <ListItem
                                            button
                                            key={index}
                                            onClick={() => {
                                                navigate(card.path);
                                                toggleSidebar();
                                            }}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: card.color,
                                                '&:hover': { backgroundColor: '#1565C0' },
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: 'white' }}>
                                                <card.Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={card.title} />
                                        </ListItem>
                                    ))}
                                </List>
                        
                ) : (
                    // Render Main Menu when on any other page
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => {
                                    navigate(item.path);
                                    toggleSidebar();
                                }}
                                sx={{
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#1565C0' },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Drawer>
        </Box>
    );
    
};

export default Sidebar;

import {
  AppBar, Toolbar, Typography, Box, IconButton, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import {
  Dashboard, People, Group, RestaurantMenu, Receipt, PointOfSale, Logout, Menu as MenuIcon
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const drawerWidth = 260;

const menuItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/home" },
  { label: "Funcionários", icon: <People />, path: "/funcionarios" },
  { label: "Clientes", icon: <Group />, path: "/clientes" },
  { label: "Produtos", icon: <RestaurantMenu />, path: "/produtos" },
  { label: "Comandas", icon: <Receipt />, path: "/comandas" },
  { label: "Caixa", icon: <PointOfSale />, path: "/caixa" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para saber qual menu está ativo
  const { isAuthenticated, logout, usuarioLogado } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const navTo = (path) => { setMobileOpen(false); navigate(path); };
  const handleLogout = () => { setMobileOpen(false); logout(); };

  if (!isAuthenticated) return null; // Esconde o menu na tela de login

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#e0f2fe' }}>
      {/* Logo Area */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <RestaurantMenu sx={{ color: "#f59e0b", fontSize: "2.2rem" }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
          Comandas<br/>do Zé
        </Typography>
      </Box>
      
      {/* Menu Links */}
      <List sx={{ px: 2, flexGrow: 1, mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <ListItem
              button key={item.path} onClick={() => navTo(item.path)}
              sx={{
                mb: 1, borderRadius: 3, cursor: "pointer",
                bgcolor: isActive ? "#ffffff" : "transparent",
                color: isActive ? "#f59e0b" : "#64748b",
                boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.03)' : 'none',
                "&:hover": { bgcolor: isActive ? "#ffffff" : "rgba(255,255,255,0.4)" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Topbar Clean (Apenas info do usuário e botão mobile) */}
      <AppBar position="fixed" sx={{ 
        width: { lg: `calc(100% - ${drawerWidth}px)` }, 
        ml: { lg: `${drawerWidth}px` },
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}>
        <Toolbar sx={{ justifyContent: { xs: 'space-between', lg: 'flex-end' }, minHeight: '70px !important' }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { lg: "none" }, color: '#1e293b' }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {usuarioLogado?.nome || "Pablo Valente"}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
              </Typography>
            </Box>
            <Avatar 
              sx={{ bgcolor: "#f59e0b", width: 42, height: 42, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)' }} 
              onClick={() => navTo('/perfil')}
            >
              {usuarioLogado?.nome?.[0]?.toUpperCase() || "A"}
            </Avatar>
            <IconButton onClick={handleLogout} sx={{ color: '#ef4444', ml: 1, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}>
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Gaveta) */}
      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        {/* Mobile */}
        <Drawer
          variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", lg: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, border: 'none' } }}
        >
          {drawer}
        </Drawer>
        {/* Desktop */}
        <Drawer
          variant="permanent" open
          sx={{ display: { xs: "none", lg: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, border: 'none' } }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
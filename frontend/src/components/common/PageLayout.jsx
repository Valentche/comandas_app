import { Box, Typography } from '@mui/material';

const PageLayout = ({ children, title, actions, maxWidth = 'lg' }) => {
  
  // Agora o layout sabe como lidar com telas "xl" (Extra Large) e vai liberar o espaço!
  const getMaxWidth = () => {
    if (maxWidth === 'xl') return 1536; 
    if (maxWidth === 'lg') return 1200;
    if (maxWidth === 'md') return 900;
    return 600;
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        pl: { lg: '170px' }, // Empurra o conteúdo para não ficar atrás da Sidebar no Desktop
        pt: '85px',          // Empurra para baixo para não ficar atrás da Topbar
        pb: 4,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: getMaxWidth(), ml: 0, px: { xs: 2, sm: 3 } }}>
        
        {/* Título Limpo e Moderno */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
            {title}
          </Typography>
          {actions && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {actions}
            </Box>
          )}
        </Box>

        {/* Área de Conteúdo Livre (Sem aquela caixa branca por trás de tudo) */}
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
        
      </Box>
    </Box>
  );
};

export default PageLayout;
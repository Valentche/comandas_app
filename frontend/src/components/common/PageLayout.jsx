import { Box, Typography, Dialog, DialogContent } from '@mui/material';
import { useState, useEffect } from 'react';

const PageLayout = ({ children, title, actions, maxWidth = 'lg' }) => {
  // Estado para controlar se o Easter Egg aparece ou não
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Hook que "escuta" o teclado o tempo todo
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Verifica se o Ctrl e a tecla 'ç' (ou 'Ç') foram pressionados juntos
      if (event.ctrlKey && event.key.toLowerCase() === 'ç') {
        event.preventDefault(); // Evita que o navegador faça outra coisa
        setShowEasterEgg(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // Limpa o evento
  }, []);

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
        pl: { lg: '260px' },
        pt: '85px',
        pb: 4,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: getMaxWidth(), ml: 0, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.5px' }}>
            {title}
          </Typography>
          {actions && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {actions}
            </Box>
          )}
        </Box>

        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      </Box>

      {/* MODAL DO EASTER EGG */}
      <Dialog 
        open={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, bgcolor: '#1e293b', p: 2, boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)' }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', overflow: 'hidden' }}>
          <img 
            // Você pode trocar este link pelo GIF que quiser!
            src="src/assets/5_parciais.gif" 
            alt="Please give me an A" 
            style={{ width: '100%', borderRadius: '16px' }} 
          />
        </DialogContent>
      </Dialog>
      
    </Box>
  );
};

export default PageLayout;
import { useState, useEffect } from 'react';
import { TextField, Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { Clear, FilterList } from '@mui/icons-material';
import { useMasks } from '../../hooks/useMasks';

const FuncionarioFilters = ({ onFilter, onClear, filters: externalFilters = {} }) => {
  const [filters, setFilters] = useState({ id: '', nome: '', cpf: '', matricula: '' });
  const { applyCpfMask } = useMasks();

  // Sincronizar estado local com props externas
  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...externalFilters }));
  }, [externalFilters]);

  const handleInputChange = (field) => (event) => {
    let value = event.target.value;
    if (field === 'cpf') {
      value = applyCpfMask(value);
    }
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilter = () => {
    // Limpar valores vazios e remover máscara do CPF antes de enviar
    const cleanedFilters = Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = key === 'cpf' ? value.replace(/\D/g, '') : value;
      }
      return acc;
    }, {});
    onFilter(cleanedFilters);
  };

  const handleClear = () => {
    setFilters({ id: '', nome: '', cpf: '', matricula: '' });
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null && value !== undefined);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<FilterList />}>
        <Typography variant="h6" component="div">
          Opções de Filtros {hasActiveFilters && '(ativos)'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Box>
              <TextField fullWidth label="ID" value={filters.id} onChange={handleInputChange('id')} placeholder="Buscar por ID..." type="number" size="small" />
            </Box>
            <Box>
              <TextField fullWidth label="Nome" value={filters.nome} onChange={handleInputChange('nome')} placeholder="Buscar por nome..." size="small" />
            </Box>
            <Box>
              <TextField fullWidth label="CPF" value={filters.cpf} onChange={handleInputChange('cpf')} placeholder="Buscar por CPF..." size="small" />
            </Box>
            <Box>
              <TextField fullWidth label="Matrícula" value={filters.matricula} onChange={handleInputChange('matricula')} placeholder="Buscar por matrícula..." size="small" />
            </Box>
            <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' }, display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button variant="outlined" startIcon={<Clear />} onClick={handleClear} disabled={!hasActiveFilters} size="small">
                Limpar
              </Button>
              <Button variant="contained" onClick={handleFilter} size="small">
                Filtrar
              </Button>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FuncionarioFilters;
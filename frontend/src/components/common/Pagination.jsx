import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
/*
opções de paginação na API:
skip, integer, default 0, minimum 0 - Número de registros para pular
limit, integer, default 100, minimum 1, maximum 1000 - Número máximo de registros
Observação: a API retorna um array simples (sem total de registros), então a
navegação é "cega": só sabemos que existe uma próxima página quando a página
atual veio completa (quantidade de itens === itens por página).
*/
// Opções fixas de itens por página
const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 25, 50, 100];
const Pagination = ({
  currentPage = 1,
  itemsPerPage = 3,
  onPageChange,
  onItemsPerPageChange,
  loading = false,
  hasNextPage = false,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (!loading && hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    if (newItemsPerPage > 0 && newItemsPerPage <= 1000) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mt: 2,
        p: 2,
        backgroundColor: "grey.50",
        borderRadius: 1,
      }}
    >
      {/* Controles de página */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          size="small"
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          startIcon={<KeyboardArrowLeft />}
        >
          Anterior
        </Button>
        <Typography variant="body2" sx={{ mx: 1 }}>
          Página {currentPage}
        </Typography>
        <Button
          size="small"
          onClick={handleNext}
          disabled={loading || !hasNextPage}
          endIcon={<KeyboardArrowRight />}
        >
          Próxima
        </Button>
      </Box>
      {/* Itens por página */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 140 }} disabled={loading}>
          <InputLabel id="itens-por-pagina-label">Itens por página</InputLabel>
          <Select
            labelId="itens-por-pagina-label"
            label="Itens por página"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
export default Pagination;

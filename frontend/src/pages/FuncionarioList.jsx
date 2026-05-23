import { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Card, CardContent, Typography, Box, Divider, Chip,
} from "@mui/material";
import { FiberNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PageLayout from "../common/PageLayout";
import ActionButtons from "../common/ActionButtons";
import Pagination from "../common/Pagination"; 
import FuncionarioFilters from "../common/FuncionarioFilters"; // Arquivo que você vai criar
import { funcionarioService } from "../../services/funcionarioService"; 
import { getGrupoInfo } from "../../constants/userGroups"; 
import { useMasks } from "../../hooks/useMasks"; 
import showConfirm from "../../utils/confirm";
import showSnackbar from "../../utils/snackbar";

function FuncionarioList() {
  const navigate = useNavigate();
  const { applyCpfMask, applyPhoneMask } = useMasks();

  // Estados
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ skip: 0, limit: 3, currentPage: 1 });
  const [hasItems, setHasItems] = useState(true);

  const handleView = (item) => showSnackbar(`Visualizando: ${item.nome}`, "info");
  const handleEdit = (item) => navigate(`/funcionario/${item.id}`);
  
  // Função de exclusão real na API
  const handleDelete = (item) => {
    showConfirm("Excluir funcionário", `Deseja excluir ${item.nome}?`, async () => {
      try {
        await funcionarioService.delete(item.id);
        showSnackbar(`${item.nome} excluído com sucesso!`, "success");
        setFuncionarios(funcionarios.filter((f) => f.id !== item.id));
      } catch (error) {
        showSnackbar("Erro ao excluir funcionário", "error");
      }
    });
  };

  // Filtros e Paginação
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, skip: 0, currentPage: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, skip: 0, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    const newSkip = (newPage - 1) * pagination.limit;
    setPagination((prev) => ({ ...prev, skip: newSkip, currentPage: newPage }));
  };

  const handleItemsPerPageChange = (newLimit) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, skip: 0, currentPage: 1 }));
  };

  // Carregar dados da API
  useEffect(() => {
    const loadFuncionarios = async () => {
      try {
        setLoading(true);
        const params = { skip: pagination.skip, limit: pagination.limit, ...filters };
        const response = await funcionarioService.list(params);
        const data = response.data || response;
        setFuncionarios(data);
        setHasItems(data && data.length > 0);
      } catch (error) {
        showSnackbar('Erro ao carregar funcionários', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadFuncionarios();
  }, [pagination.skip, pagination.limit, filters]);

  const actions = (
    <Button
      variant="contained" color="secondary"
      onClick={() => navigate("/funcionario")}
      startIcon={<FiberNew />}
      sx={{ fontWeight: 600 }}
    >
      Novo
    </Button>
  );

  const renderDesktop = (f) => (
    <TableRow key={f.id} hover>
      <TableCell>{f.id}</TableCell>
      <TableCell sx={{ fontWeight: 500 }}>{f.nome}</TableCell>
      <TableCell>{f.matricula}</TableCell>
      {/* Máscaras aplicadas aqui */}
      <TableCell>{applyCpfMask(f.cpf)}</TableCell>
      <TableCell>{applyPhoneMask(f.telefone)}</TableCell>
      <TableCell>
        {/* Grupo formatado corretamente */}
        <Chip label={getGrupoInfo(f.grupo).label} color={getGrupoInfo(f.grupo).color} size="small" />
      </TableCell>
      <TableCell>
        <ActionButtons item={f} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      </TableCell>
    </TableRow>
  );

  const renderMobile = (f) => (
    <Card key={f.id} sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>{f.nome}</Typography>
            <Typography variant="body2" color="text.secondary">Matrícula: {f.matricula}</Typography>
          </Box>
          <Chip label={getGrupoInfo(f.grupo).label} color={getGrupoInfo(f.grupo).color} size="small" />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">CPF: <strong>{applyCpfMask(f.cpf)}</strong></Typography>
        <Typography variant="body2" color="text.secondary">Tel: <strong>{applyPhoneMask(f.telefone)}</strong></Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <ActionButtons item={f} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout title="Funcionários" actions={actions}>
      {/* Aqui entram os filtros */}
      <FuncionarioFilters onFilter={handleFilter} onClear={handleClearFilters} filters={filters} />

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["ID", "Nome", "Matrícula", "CPF", "Telefone", "Grupo", "Ações"].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{funcionarios.map(renderDesktop)}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {funcionarios.map(renderMobile)}
      </Box>

      {/* Paginação no final */}
      <Pagination
        currentPage={pagination.currentPage}
        itemsPerPage={pagination.limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        loading={loading}
        hasItems={hasItems}
      />
    </PageLayout>
  );
}

export default FuncionarioList;
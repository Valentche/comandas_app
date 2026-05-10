import minhaFoto from "../../assets/eu_512.png";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import {
  People,
  Group,
  RestaurantMenu,
  Receipt,
  TrendingUp,
  PointOfSale,
} from "@mui/icons-material";
import PageLayout from "../common/PageLayout";
import { useAuth } from "../../context/AuthContext";

const fmt = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    v,
  );

const cards = [
  {
    icon: <People />,
    label: "Funcionários",
    value: "3",
    color: "#3b82f6",
    sub: "ativos",
  },
  {
    icon: <Group />,
    label: "Clientes",
    value: "3",
    color: "#8b5cf6",
    sub: "cadastrados",
  },
  {
    icon: <RestaurantMenu />,
    label: "Produtos",
    value: "3",
    color: "#f59e0b",
    sub: "no cardápio",
  },
  {
    icon: <Receipt />,
    label: "Comandas abertas",
    value: "2",
    color: "#10b981",
    sub: "hoje",
  },
  {
    icon: <TrendingUp />,
    label: "Faturamento",
    value: fmt(245.4),
    color: "#ef4444",
    sub: "hoje",
  },
  {
    icon: <PointOfSale />,
    label: "Caixa",
    value: fmt(980.0),
    color: "#06b6d4",
    sub: "mês",
  },
];

const ultimasComandas = [
  {
    id: 1,
    comanda: "001",
    cliente: "Alan Felipe Jones",
    valor: 87.5,
    status: "Aberta",
    statusColor: "success",
  },
  {
    id: 2,
    comanda: "002",
    cliente: "Sem cliente",
    valor: 34.0,
    status: "Em atendimento",
    statusColor: "warning",
  },
  {
    id: 3,
    comanda: "003",
    cliente: "Tony Hawk",
    valor: 123.9,
    status: "Fechada",
    statusColor: "default",
  },
];

function Dashboard() {
  const { usuarioLogado } = useAuth();
  const nome = usuarioLogado?.nome || "Usuário";
  const agora = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageLayout title="Dashboard" maxWidth="xl">
      {/* Boas-vindas */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          src={minhaFoto}
          alt="Minha foto"
          sx={{ width: 48, height: 48, fontWeight: 700 }}
        >
          {nome[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Olá, {nome}!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {agora}
          </Typography>
        </Box>
      </Box>

      {/* Cards de resumo */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // Celular: 1 card por linha
            sm: "1fr 1fr", // Tablet pequeno: 2 cards por linha
            md: "repeat(3, 1fr)", // Tablet grande/Monitor médio: 3 cards por linha
            lg: "repeat(6, 1fr)", // Tela grande: Todos os 6 cards lado a lado
          },
          gap: 3, // Espaço entre os cards (pode aumentar para 4 se quiser ainda mais solto)
          mb: 4,
        }}
      >
        {cards.map((c) => (
          <Card
            key={c.label}
            elevation={2}
            sx={{
              borderTop: `3px solid ${c.color}`,
              transition: "transform .15s",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ color: c.color, mb: 1 }}>{c.icon}</Box>
              <Typography variant="h6" fontWeight={700} sx={{ color: c.color }}>
                {c.value}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {c.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {c.sub}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Últimas comandas */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Últimas Comandas
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {ultimasComandas.map((c) => (
          <Card
            key={c.id}
            elevation={1}
            sx={{ "&:hover": { bgcolor: "grey.50" } }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 36,
                      height: 36,
                      fontSize: ".85rem",
                      fontWeight: 700,
                    }}
                  >
                    #{c.comanda}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>{c.cliente}</Typography>
                    <Chip
                      label={c.status}
                      color={c.statusColor}
                      size="small"
                      sx={{ mt: 0.3 }}
                    />
                  </Box>
                </Box>
                <Typography fontWeight={700} color="success.main">
                  {fmt(c.valor)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </PageLayout>
  );
}

export default Dashboard;

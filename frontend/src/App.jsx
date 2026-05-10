import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme"; // estilos globais
import Navbar from "./components/common/Navbar"; // componente reutilizável de navegação
import SnackbarGlobal from "./components/common/Snackbar"; // componente global de notificações
import AppRoutes from "./routes/Router"; // rotas da aplicação

//Grande parte dos códigos foram feitos taxados manualmente para testes, sem integração com a API realmente, podem ter erros e inconsistencias entre as infrmações

//Principalmente poruqe foram feitos na madrugada de um sabado pra domingo enquanto tava de plantão no serviço e cansado que é um diabo.

//O cdigo em si é meio simples, se não tivesse sido meu pc ter sido formatado pr conta de joguinhos piratas, eu podia ter entreago antes kk
//que esqueci de fazer o backup da versão que não tava o git ainda, degraça.

function App() {
  return (
    // aplica o tema global ao aplicativo - Material UI
    <ThemeProvider theme={theme}>
      {/* normaliza estilos CSS */}
      <CssBaseline />
      {/* BrowserRouter é o roteador principal que gerencia as rotas da aplicação */}
      <BrowserRouter>
        {/* O AuthProvider envolve toda a aplicação, permitindo que os componentes filhos acessem o contexto de autenticação */}
        <AuthProvider>
          {/* Navbar é o componente de navegação que contém os links para as diferentes páginas da aplicação */}
          <Navbar />
          {/* SnackbarGlobal para notificações em toda aplicação */}
          <SnackbarGlobal />
          {/* Container é um componente do Material-UI que fornece um layout responsivo e centralizado */}
          <Container
            maxWidth="xl"
            sx={{
              mt: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 2, sm: 3, md: 4 },
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* AppRoutes é o componente que contém as rotas da aplicação, definindo quais componentes devem ser renderizados em cada rota */}
            <AppRoutes />
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

import { Container, Typography } from "@mui/material";
import HousesForm from "./components/HousesForm";

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Norway Statistics Dashboard
      </Typography>

      <HousesForm />
    </Container>
  );
};

export default App;

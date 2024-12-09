import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router";
import { Assignment, TableView } from "@mui/icons-material";
import lang from "../../locales/en.json";

import "./welcome.css";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main id="welcome">
      <Container maxWidth="sm">
        <Box textAlign="center" mt={4} mb={4}>
          <Typography variant="h2" gutterBottom>
            {lang.welcome.title}
          </Typography>
          <Typography variant="body1">
            {lang.welcome.intro}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            startIcon={<Assignment />}
            onClick={() => navigate("/registration")}
          >
            {lang.registration.title}
          </Button>

          <Button
            variant="contained"
            startIcon={<TableView />}
            onClick={() => navigate("/sortableTable")}
          >
            {lang.sortableTable.title}
          </Button>
        </Box>
      </Container>
    </main>
  );
};

export default Welcome;

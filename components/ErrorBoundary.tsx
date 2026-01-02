"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Typography, Button, Container, Paper } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload(); // Hard reset to clear bad state
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "#fff1f0", // Light red tint
            }}
          >
            <Typography variant="h4" gutterBottom color="error">
              Oops!
            </Typography>
            <Typography variant="body1" paragraph>
              Something went wrong while generating the OTP.
            </Typography>
            {this.state.error && (
              <Typography
                variant="caption"
                display="block"
                sx={{
                  bgcolor: "rgba(0,0,0,0.05)",
                  p: 1,
                  borderRadius: 1,
                  mb: 3,
                  fontFamily: "monospace",
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={this.handleReset}
            >
              Reload Application
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

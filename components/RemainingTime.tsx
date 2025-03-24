import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export function RemainingTime({
  duration,
  remaining,
}: {
  duration: number;
  remaining: number;
}) {
  // TODO: duration must not accept the number zero(0)!

  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        value={-remaining * (100 / duration)}
        thickness={3}
        size={150}
        color={remaining < 10 && remaining < duration / 2 ? "error" : "primary"}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50% )",
        }}
      >
        <Typography
          variant="h3"
          component="p"
          color={
            remaining < 10 && remaining < duration / 2 ? "error" : "primary"
          }
        >
          {remaining}
        </Typography>
      </Box>
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export function RemainingTime({
  duration,
  remaining,
}: {
  duration: number;
  remaining: number;
}) {
  const progressValue = Math.max(
    0,
    Math.min(100, (remaining / duration) * 100)
  );

  return (
    <Box
      sx={{ position: "relative" }}
      role="timer"
      aria-label={`${remaining} seconds remaining`}
    >
      <CircularProgress
        variant="determinate"
        value={-progressValue}
        thickness={3}
        size={150}
        color={remaining < 10 && remaining < duration / 2 ? "error" : "primary"}
        aria-hidden="true"
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

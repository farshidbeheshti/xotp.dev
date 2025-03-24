"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import {
  Select,
  MenuItem,
  Box,
  Stack,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { QRCodeSVG } from "qrcode.react";
import { createTOTPToken } from "@/lib/xotp";
import { RemainingTime, OptionSlider, Tip } from "@/components";

export default function Index() {
  // TODO: Define type!
  const [otp, setOtp] = React.useState({
    token: "",
    keyUri: "",
    remaining: 0,
  });

  // TODO: Define type!
  const defaultOptions = {
    algorithm: "sha1",
    secret: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    duration: 30,
    digits: 6,
    window: 0,
    issuer: "XOTP",
    account: "Foo",
  };

  const [options, setOptions] = React.useState({
    ...defaultOptions,
  });

  const [remaining, setRemaining] = React.useState(0);
  const [needsReset, setNeedsReset] = React.useState(true);
  // TODO: define the `newOptions` type
  function refereshTotp(newOptions) {
    const request = {
      ...newOptions,
      secret: newOptions.secret.toUpperCase(),
    };
    createTOTPToken({ ...request })
      .then((result) => {
        setOtp({
          ...result,
          token: result.token,
          keyUri: result.keyUri,
        });
        setRemaining(
          newOptions.duration -
            (Math.floor(Date.now() / 1000) % newOptions.duration)
        );
        setOptions({ ...request });
        setNeedsReset(false);
      })
      .catch(() => {})
      .finally(() => {});
  }

  let counter = 0;

  React.useEffect(() => {
    const timeId = setInterval(() => {
      if (needsReset) refereshTotp(options);
      const remaining =
        options.duration - (Math.floor(Date.now() / 1000) % options.duration);
      setRemaining(remaining);
      if (remaining == 1) {
        setNeedsReset(true);
      }
    }, 1000);

    return () => {
      if (timeId) clearInterval(timeId);
    };
  }, [options, needsReset, remaining]);

  const handleChange = (event) => {
    const { name = event.target?.name, value = event.target?.value } = event;
    const newOptions = { ...options, [name]: value };
    setOptions({ ...newOptions });
    (function (localCounter) {
      const id = setTimeout(() => {
        // Just to make sure it doesn't send the request
        // on any quick user action like typing quickly.
        // FIXIT: It doesn't work as the description, at the moment!
        if (localCounter == counter) {
          clearTimeout(id);
          refereshTotp(newOptions);
        }
      }, 0);
    })(++counter);
  };

  return (
    <Grid container alignItems={"center"} columnSpacing={1}>
      <Grid
        container
        size={{ sm: 12, md: 6 }}
        rowSpacing={5}
        padding={1}
        order={{ xs: 1, md: 0 }}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="caption" color="#0009">
            Duration
          </Typography>
          <OptionSlider
            name="duration"
            aria-label="Duration"
            onChangeHandler={handleChange}
            step={1}
            min={10}
            max={240}
            defaultValue={defaultOptions.duration}
            valueLabelDisplay="on"
          />
          <Tip
            text="Duration (in seconds) a token is valid for."
            icon="duration"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="caption" color="#0009">
            Digits
          </Typography>
          <OptionSlider
            name="digits"
            aria-label="Digits"
            max={10}
            min={1}
            marks
            step={1}
            valueLabelDisplay="on"
            onChangeHandler={handleChange}
            defaultValue={defaultOptions.digits}
          />
          <Tip text="The number of digits for the token" icon="digits" />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel id="algorithm-select-label">Algorithm</InputLabel>
            <Select
              size="small"
              labelId="algorithm-select-label"
              id="demo-simple-select"
              name="algorithm"
              label="Algorithm"
              value={options.algorithm}
              onChange={handleChange}
            >
              <MenuItem value={"sha1"}>sha-1</MenuItem>
              <MenuItem value={"sha224"}>sha-224</MenuItem>
              <MenuItem value={"sha256"}>sha-256</MenuItem>
              <MenuItem value={"sha384"}>sha-384</MenuItem>
              <MenuItem value={"sha512"}>sha-512</MenuItem>
              <MenuItem value={"sha-512/224"}>sha-512/224</MenuItem>
              <MenuItem value={"sha-512/256"}>sha-512/256</MenuItem>
              <MenuItem value={"sha3-224"}>sha3-224</MenuItem>
              <MenuItem value={"sha3-256"}>sha3-256</MenuItem>
              <MenuItem value={"sha3-384"}>sha3-384</MenuItem>
              <MenuItem value={"sha3-512"}>sha3-512</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Tip
            text="The algorithm used for calculating the HMAC, default is 'sha1'."
            icon="hashAlgo"
            top={0.5}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            type="text"
            name="secret"
            label="Secret"
            defaultValue={options.secret}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <Tip
            text="Secret key used by the hash function to calculate the HMAC. You could encode/decode or generate secret keys in various encodings XOPT Secret() constructor."
            icon="secret"
            top={0.5}
          />
        </Grid>
        <Grid size={{ xs: 12 }} container rowSpacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              type="text"
              name="account"
              label="Account"
              defaultValue={options.account}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              type="text"
              name="issuer"
              label="Issuer"
              defaultValue={options.issuer}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Tip
            text="The account is the identifier/name of the user who token is issued for and the issuer is the provider or service managing that account.
            They are just arbitrary labels using by apps."
            icon="account"
            top={0.5}
          />
        </Grid>
      </Grid>

      <Grid
        flexGrow={1}
        container
        size={{ sm: 12, md: 6 }}
        padding={2}
        alignItems={"center"}
      >
        <Stack alignItems={"center"} width={"100%"}>
          <RemainingTime duration={options.duration} remaining={remaining} />
          <Box textAlign={"center"} marginY={2}>
            <Typography variant="h2" component="span">
              {otp.token}
            </Typography>
          </Box>
          <QRCodeSVG value={otp.keyUri} size={186} />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            name="keyUri"
            label="Key URI"
            defaultValue={otp.keyUri}
            onChange={handleChange}
            slotProps={{ htmlInput: { readOnly: true } }}
            focused
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

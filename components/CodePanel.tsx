'use client';
import { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Snackbar, Fade } from '@mui/material';
import { ContentCopy, CheckCircle } from '@mui/icons-material';
import { OTPOptions } from '@/types/otp';
import { copyToClipboard } from '@/lib/clipboard';

interface CodePanelProps {
  options: OTPOptions;
}

export function CodePanel({ options }: CodePanelProps) {
  const [showToast, setShowToast] = useState(false);
  const codeString = `import { Secret, TOTP } from 'xotp';

const secret = Secret.from('${options.secret}');
const totp = new TOTP({
  algorithm: '${options.algorithm}',
  digits: ${options.digits},
  duration: ${options.duration},
  issuer: '${options.issuer}',
});

const token = totp.generate({ secret });
const keyUri = totp.keyUri({
  secret,
  account: '${options.account}',
});`;

  const handleCopyCode = async () => {
    await copyToClipboard(codeString);
    setShowToast(true);
  };

  const renderHighlightedCode = () => {
    return (
      <Box sx={{ fontFamily: 'Monaco, Consolas, monospace', lineHeight: 1.5 }}>
        <Box component="span" sx={{ color: '#ff7b72' }}>import</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> &#123; </Box>
        <Box component="span" sx={{ color: '#79c0ff' }}>Secret</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>, </Box>
        <Box component="span" sx={{ color: '#79c0ff' }}>TOTP</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> &#125; </Box>
        <Box component="span" sx={{ color: '#ff7b72' }}>from</Box>
        <Box component="span" sx={{ color: '#a5d6ff' }}> &apos;xotp&apos;</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>;</Box>
        <br /><br />
        
        <Box component="span" sx={{ color: '#ff7b72' }}>const</Box>
        <Box component="span" sx={{ color: '#ffa657' }}> secret</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> = </Box>
        <Box component="span" sx={{ color: '#79c0ff' }}>Secret</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>.</Box>
        <Box component="span" sx={{ color: '#d2a8ff' }}>from</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>(</Box>
        <Box component="span" sx={{ color: '#a5d6ff' }}>&apos;{options.secret}&apos;</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>);</Box>
        <br />
        
        <Box component="span" sx={{ color: '#ff7b72' }}>const</Box>
        <Box component="span" sx={{ color: '#ffa657' }}> totp</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> = </Box>
        <Box component="span" sx={{ color: '#ff7b72' }}>new</Box>
        <Box component="span" sx={{ color: '#79c0ff' }}> TOTP</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>(&#123;</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#7ee787' }}>algorithm</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>: </Box>
        <Box component="span" sx={{ color: '#a5d6ff' }}>&apos;{options.algorithm}&apos;</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#7ee787' }}>digits</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>: </Box>
        <Box component="span" sx={{ color: '#79c0ff' }}>{options.digits}</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#7ee787' }}>duration</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>: </Box>
        <Box component="span" sx={{ color: '#79c0ff' }}>{options.duration}</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#7ee787' }}>issuer</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>: </Box>
        <Box component="span" sx={{ color: '#a5d6ff' }}>&apos;{options.issuer}&apos;</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0' }}>&#125;);</Box>
        <br /><br />
        
        <Box component="span" sx={{ color: '#ff7b72' }}>const</Box>
        <Box component="span" sx={{ color: '#ffa657' }}> token</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> = </Box>
        <Box component="span" sx={{ color: '#ffa657' }}>totp</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>.</Box>
        <Box component="span" sx={{ color: '#d2a8ff' }}>generate</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>(&#123; </Box>
        <Box component="span" sx={{ color: '#ffa657' }}>secret</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> &#125;);</Box>
        <br />
        
        <Box component="span" sx={{ color: '#ff7b72' }}>const</Box>
        <Box component="span" sx={{ color: '#ffa657' }}> keyUri</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}> = </Box>
        <Box component="span" sx={{ color: '#ffa657' }}>totp</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>.</Box>
        <Box component="span" sx={{ color: '#d2a8ff' }}>keyUri</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>(&#123;</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#ffa657' }}>secret</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0', ml: 2 }}>  </Box>
        <Box component="span" sx={{ color: '#7ee787' }}>account</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>: </Box>
        <Box component="span" sx={{ color: '#a5d6ff' }}>&apos;{options.account}&apos;</Box>
        <Box component="span" sx={{ color: '#e2e8f0' }}>,</Box>
        <br />
        
        <Box component="span" sx={{ color: '#e2e8f0' }}>&#125;);</Box>
      </Box>
    );
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Generated Code
          </Typography>
          <IconButton onClick={handleCopyCode} size="small">
            <ContentCopy fontSize="small" />
          </IconButton>
        </Box>
        <Box
          sx={{
            backgroundColor: '#0f172a',
            padding: 2,
            borderRadius: 1,
            fontSize: '0.875rem',
            overflow: 'auto',
          }}
        >
          {renderHighlightedCode()}
        </Box>
      </CardContent>

      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <Box
          sx={{
            bgcolor: "rgba(33, 33, 33, 0.95)",
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            mb: 4,
            backdropFilter: "blur(8px)",
          }}
        >
          <CheckCircle sx={{ fontSize: 20, color: "#4caf50" }} />
          <Typography variant="body2" fontWeight={600}>
            Code copied
          </Typography>
        </Box>
      </Snackbar>
    </Card>
  );
}
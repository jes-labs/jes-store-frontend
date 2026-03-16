/**
 * JesStore Design Tokens (Electric Lime)
 * Source of Truth for HSL and OKLCH values
 */

export const tokens = {
  colors: {
    background: 'oklch(0.08 0 0)',       // #050505
    foreground: 'oklch(0.95 0 0)',       // #fafafa
    card: 'oklch(0.11 0 0)',             // #121212
    primary: 'oklch(0.92 0.16 125)',    // #d9f99d (Electric Lime)
    secondary: 'oklch(217 91% 60%)',    // #3b82f6 (JesStore blue - HSL)
    muted: 'oklch(0.18 0 0)',            // #262626
    border: 'oklch(0.2 0 0)',            // #333333
    gold: 'hsl(48 96% 53%)',             // #f9c22e
  },
  typography: {
    headings: 'Outfit',
    body: 'Plus Jakarta Sans',
    mono: 'JetBrains Mono',
  },
  radius: '0.75rem',
} as const;

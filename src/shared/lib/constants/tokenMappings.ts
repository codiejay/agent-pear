// Tokens available on Hyperliquid
export const HYPERLIQUID_TOKENS = new Set([
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT',
  'DOGEUSDT', 'MATICUSDT', 'SOLUSDT', 'DOTUSDT', 'LINKUSDT',
  'UNIUSDT', 'AAVEUSDT', 'ATOMUSDT', 'LTCUSDT', 'ETCUSDT',
  'AXSUSDT', 'NEARUSDT', 'GMXUSDT', 'OPUSDT', 'ARBUSDT',
  'CELOUSDT', 'MINAUSDT', 'ILVUSDT', 'STRKUSDT'
]);

// Tokens available on Symm (Binance)
export const SYMM_TOKENS = new Set([
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT',
  'DOGEUSDT', 'MATICUSDT', 'SOLUSDT', 'DOTUSDT', 'LINKUSDT',
  'AVAXUSDT', 'FTMUSDT', 'SANDUSDT', 'MANAUSDT', 'APTUSDT',
  'AAVEUSDT', 'ATOMUSDT', 'LTCUSDT', 'ETCUSDT', 'AXSUSDT',
  'NEARUSDT', 'GMXUSDT', 'OPUSDT', 'ARBUSDT', 'CELOUSDT',
  'BOMEUSDT', 'MEMEUSDT', 'GRASSUSDT', 'AIXBTUSDT', 'FILUSDT',
  'HOTUSDT', 'ANKRUSDT', 'DENTUSDT'
]);

/**
 * Category definitions based on token characteristics
 * Used to group similar tokens together
 */
export const TOKEN_CATEGORIES: Record<string, string[]> = {
  'Layer1': ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'AVAXUSDT', 'FTMUSDT', 'CELOUSDT', 'FILUSDT'],
  'DeFi': ['UNIUSDT', 'AAVEUSDT', 'GMXUSDT', 'STRKUSDT', 'BOMEUSDT'],
  'Gaming': ['AXSUSDT', 'ILVUSDT', 'MANAUSDT', 'SANDUSDT'],
  'Infrastructure': ['LINKUSDT', 'MATICUSDT', 'ARBUSDT', 'OPUSDT'],
  'Meme': ['DOGEUSDT', 'MEMEUSDT', 'GRASSUSDT', 'AIXBTUSDT', 'HOTUSDT'],
};

/**
 * Helper function to get token name without the USDT suffix
 * Used in UI display and signal enrichment
 * 
 * @example
 * getBaseToken("BTCUSDT") // returns "BTC"
 */
export function getBaseToken(token: string): string {
  return token.replace('USDT', '');
} 
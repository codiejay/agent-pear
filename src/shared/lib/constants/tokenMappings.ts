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
  'HOTUSDT', 'ANKRUSDT', 'DENTUSDT', 'CFXUSDT', 'DUSKUSDT',
  'PHBUSDT', 'YGGUSDT', 'JOEUSDT', 'SEIUSDT', 'ETHFIUSDT',
  'WOOUSDT', 'ILVUSDT', 'ROSEUSDT', 'FLOWUSDT', 'OGNUSDT',
  'C98USDT', 'CTSIUSDT', 'ENJUSDT', 'HFTUSDT', 'WUSDT',
  'XAIUSDT', 'BLURUSDT', 'GALAUSDT', 'DODOXUSDT', 'NEOUSDT',
  'ONGUSDT', 'EGLDUSDT', 'CHRUSDT', 'PYTHUSDT', 'METISUSDT',
  'VANRYUSDT', 'IDUSDT', 'ASTRUSDT', 'TRUUSDT', 'OMNIUSDT',
  '1INCHUSDT', 'AIUSDT', 'GRTUSDT'
]);

export const VERTEX_TOKENS = new Set([
  'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'ARBUSDT', 'LINKUSDT',
  'MATICUSDT', 'OPUSDT', 'GMXUSDT', 'APTUSDT', 'AVAXUSDT',
  'NEARUSDT', 'AAVEUSDT', 'UNIUSDT', 'SEIUSDT', 'JOEUSDT',
  'PYTHUSDT', 'XAIUSDT'
]);

export const GMX_TOKENS = new Set([
  'BTCUSDT', 'ETHUSDT', 'ARBUSDT', 'LINKUSDT', 'UNIUSDT',
  'AVAXUSDT', 'SOLUSDT'
]);

// Mapping of engines to their supported tokens
export const ENGINE_MAP = {
  Hyperliquid: HYPERLIQUID_TOKENS,
  SYMM: SYMM_TOKENS,
  Vertex: VERTEX_TOKENS,
  GMX: GMX_TOKENS
} as const;

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
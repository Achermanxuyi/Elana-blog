export const INIT_DELAY = 0.3
export const ANIMATION_DELAY = 0.1
export const CARD_SPACING = 36
export const CARD_SPACING_SM = 24
export const BLOG_SLUG_KEY = process.env.BLOG_SLUG_KEY || ''

/**
 * GitHub Repository Configuration (Server-side only)
 */
export const GITHUB_CONFIG = {
	OWNER: process.env.GITHUB_OWNER || 'Achermanxuyi',
	REPO: process.env.GITHUB_REPO || 'Elana-blog',
	BRANCH: process.env.GITHUB_BRANCH || 'main',
	APP_ID: process.env.GITHUB_APP_ID || '2568144',
	ENCRYPT_KEY: process.env.GITHUB_ENCRYPT_KEY || 'wudishiduomejimo',
} as const

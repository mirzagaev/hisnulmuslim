import { CATEGORY_COLORS } from '../theme/colors';

export interface KapitelTabBarSchema {
    label: string;
    colorItem: string;
    background: any;
}

// URL-Slug aus dem Kategorie-Label ableiten, z. B. "Alltag" -> "alltag",
// "1. Hilfe" -> "1_hilfe". Wird für das lesbare Routen-Schema
// "kategorie/<slug>" (statt der bisherigen numerischen "kategorien/<id>") genutzt.
function slugify(label: string): string {
    return label
        .toLowerCase()
        .replace(/\./g, '')
        .trim()
        .replace(/\s+/g, '_');
}

// Kategorie-ID ("1" … "7") -> URL-Slug ("alltag", "1_hilfe", …)
export const CATEGORY_SLUGS: Record<string, string> = Object.fromEntries(
    Object.entries(CATEGORY_COLORS).map(([id, { label }]) => [id, slugify(label)])
);

// Umkehrung für das Parsen von Deep-Links: Slug -> Kategorie-ID
export const CATEGORY_IDS_BY_SLUG: Record<string, string> = Object.fromEntries(
    Object.entries(CATEGORY_SLUGS).map(([id, slug]) => [slug, id])
);

// Baut die Navigations-Params für den "Bittgebete"-Screen, inkl. catSlug/themaId,
// damit react-navigation im Web auch bei interner Navigation (Kategorie, Suche,
// Favoriten) die passende "kategorie/<slug>/<themaId>"-URL in die Adresszeile schreibt.
export function buildDuaRouteParams(
    thema: { id: number; titel: string },
    kategorie: string,
    catId: number | string
) {
    return {
        thema,
        kategorie,
        catId,
        catSlug: CATEGORY_SLUGS[String(catId)],
        themaId: thema.id,
    };
}

export const tabBarStruktur: Record < string, KapitelTabBarSchema > = {
    '1': {
        label: CATEGORY_COLORS['1'].label,
        colorItem: CATEGORY_COLORS['1'].base,
        background: require('../assets/backgrounds/cat1-alltag.jpg'),
    },
    '2': {
        label: CATEGORY_COLORS['2'].label,
        colorItem: CATEGORY_COLORS['2'].base,
        background: require('../assets/backgrounds/cat2-gebet.jpg'),
    },
    '3': {
        label: CATEGORY_COLORS['3'].label,
        colorItem: CATEGORY_COLORS['3'].base,
        background: require('../assets/backgrounds/cat3-reisen.jpg'),
    },
    '4': {
        label: CATEGORY_COLORS['4'].label,
        colorItem: CATEGORY_COLORS['4'].base,
        background: require('../assets/backgrounds/cat4-schutz.jpg'),
    },
    '5': {
        label: CATEGORY_COLORS['5'].label,
        colorItem: CATEGORY_COLORS['5'].base,
        background: require('../assets/backgrounds/cat5-hilfe.jpg'),
    },
    '6': {
        label: CATEGORY_COLORS['6'].label,
        colorItem: CATEGORY_COLORS['6'].base,
        background: require('../assets/backgrounds/cat6-wohlsein.jpg'),
    },
    '7': {
        label: CATEGORY_COLORS['7'].label,
        colorItem: CATEGORY_COLORS['7'].base,
        background: require('../assets/backgrounds/cat7-pilgern.jpg'),
    },
};

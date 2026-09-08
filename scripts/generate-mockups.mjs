// Einmaliges Hilfsskript zum Erzeugen von App-Store-Mockup-Screenshots.
// Startet KEINEN eigenen Dev-Server -- erwartet, dass `expo start --web`
// bereits unter BASE_URL läuft. Nutzung:
//   node scripts/generate-mockups.mjs
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.MOCKUP_BASE_URL ?? 'http://localhost:8082';

// Apple App Store Connect Screenshot-Spezifikationen:
// https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
//
// Google Play Console verlangt (Stand der Store-Eingabemaske) für Screenshots
// striktes Seitenverhältnis 16:9 bzw. 9:16 (nicht die native Gerätemetrik) -
// deshalb wird dort NICHT die reale Displayauflösung 1:1 übernommen, sondern
// Breite/Höhe passend auf 9:16 gerundet.
const TARGETS = [
    {
        key: 'iPhone-6.5',
        // iPhone 14 Plus / 13 Pro Max / 12 Pro Max Logikgröße, @3x
        viewport: { width: 428, height: 926 },
        deviceScaleFactor: 3,
        expectedPx: { width: 1284, height: 2778 },
    },
    {
        key: 'iPad-13',
        // iPad Pro 13" (M4) Logikgröße, @2x
        viewport: { width: 1032, height: 1376 },
        deviceScaleFactor: 2,
        expectedPx: { width: 2064, height: 2752 },
    },
    {
        key: 'Pixel-10',
        // Reale Displaybreite des Pixel 10 (1080px, laut DXOMark/GSMArena),
        // Höhe auf Play-Store-Pflichtverhältnis 9:16 gerundet (real: 20:9/2424px).
        viewport: { width: 360, height: 640 },
        deviceScaleFactor: 3,
        expectedPx: { width: 1080, height: 1920 },
    },
    {
        key: 'Android-Tablet-10',
        // Generisches 10"-Android-Tablet (Play-Store-Kategorie "10-Zoll-Tablet"),
        // Größenordnung angelehnt an iPad-13, auf 9:16 gerundet.
        viewport: { width: 720, height: 1280 },
        deviceScaleFactor: 2,
        expectedPx: { width: 1440, height: 2560 },
    },
];

// Nur Targets aus MOCKUP_TARGETS erzeugen (Komma-separierte keys), falls gesetzt.
const targetFilter = process.env.MOCKUP_TARGETS?.split(',').map((s) => s.trim());
const activeTargets = targetFilter ? TARGETS.filter((t) => targetFilter.includes(t.key)) : TARGETS;

// Screens, die für den Store gezeigt werden sollen (Pfad passend zum
// linking-Konfig in navigation/AppNavigation.tsx). `afterLoad` kann
// zusätzliche Interaktion simulieren (z. B. Drawer öffnen), bevor der
// Screenshot gemacht wird.
const SCREENS = [
    { name: '01-startseite', path: '/' },
    { name: '02-kategorie-alltag', path: '/kategorie/alltag' },
    { name: '03-favoriten', path: '/favorites' },
    {
        name: '04-drawer-offen',
        path: '/',
        afterLoad: async (page) => {
            // Standard-Button des Drawer-Navigators (@react-navigation/drawer),
            // accessibilityLabel wird auf Web zu aria-label.
            await page.getByLabel('Show navigation menu').click();
            await page.waitForTimeout(600); // Drawer-Öffnen-Animation abwarten
        },
    },
    // "Alltag" -> "Gedenken am Morgen und am Abend" (Thema-uid 27 laut API) -
    // Einzelansicht eines Bittgebets, wie man sie beim Öffnen aus der Kategorie sieht.
    { name: '05-bittgebet-detail', path: '/kategorie/alltag/27' },
];

async function shootFor(browser, target) {
    const outDir = path.resolve('mockups', target.key);
    await mkdir(outDir, { recursive: true });

    const context = await browser.newContext({
        viewport: target.viewport,
        deviceScaleFactor: target.deviceScaleFactor,
        isMobile: true,
        hasTouch: true,
    });
    const page = await context.newPage();

    for (const screen of SCREENS) {
        const url = BASE_URL + screen.path;
        console.log(`[${target.key}] ${screen.name} <- ${url}`);
        await page.goto(url, { waitUntil: 'networkidle' });
        // React-Navigation/Fonts/Bilder brauchen nach dem Laden noch etwas Zeit.
        await page.waitForTimeout(1500);

        if (screen.afterLoad) {
            await screen.afterLoad(page);
        }

        const outFile = path.join(outDir, `${screen.name}.png`);
        await page.screenshot({ path: outFile });
        console.log(`  -> ${outFile}`);
    }

    await context.close();
}

const browser = await chromium.launch();
try {
    for (const target of activeTargets) {
        await shootFor(browser, target);
    }
} finally {
    await browser.close();
}

console.log('Fertig.');

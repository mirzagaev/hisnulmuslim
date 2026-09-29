// Einmaliges Hilfsskript zum Erzeugen von Store-Mockup-Screenshots.
// Startet KEINEN eigenen Dev-Server -- erwartet, dass `expo start --web`
// bereits unter BASE_URL läuft. Nutzung:
//   node scripts/generate-mockups.mjs
import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.MOCKUP_BASE_URL ?? 'http://localhost:8081';

// Apple App Store Connect Screenshot-Spezifikationen:
// https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
//
// Google Play Console verlangt für Screenshots striktes Seitenverhältnis
// 16:9 bzw. 9:16 (320–3840px je Kante) - deshalb wird dort NICHT die reale
// Displayauflösung 1:1 übernommen, sondern auf 9:16 gerundet.
const TARGETS = [
    {
        key: 'PlayStore-Telefon',
        // Typisches Android-Telefon (360dp breit), @3x, 9:16
        viewport: { width: 360, height: 640 },
        deviceScaleFactor: 3,
        expectedPx: { width: 1080, height: 1920 },
    },
    {
        key: 'PlayStore-Tablet-7',
        // 7"-Android-Tablet (~600dp breit), @2x, exakt 9:16 (612/1088 = 0,5625)
        viewport: { width: 612, height: 1088 },
        deviceScaleFactor: 2,
        expectedPx: { width: 1224, height: 2176 },
    },
    {
        key: 'AppStore-iPhone-6.5',
        // iPhone 11 Pro Max / XS Max Logikgröße, @3x
        viewport: { width: 414, height: 896 },
        deviceScaleFactor: 3,
        expectedPx: { width: 1242, height: 2688 },
    },
    {
        key: 'AppStore-iPad-13',
        // iPad Pro 13" (M4) Logikgröße, @2x
        viewport: { width: 1032, height: 1376 },
        deviceScaleFactor: 2,
        expectedPx: { width: 2064, height: 2752 },
    },
];

// Nur Targets aus MOCKUP_TARGETS erzeugen (Komma-separierte keys), falls gesetzt.
const targetFilter = process.env.MOCKUP_TARGETS?.split(',').map((s) => s.trim());
const activeTargets = targetFilter ? TARGETS.filter((t) => targetFilter.includes(t.key)) : TARGETS;

// Thema-uids (laut API), die als Favoriten vorbelegt werden, damit die
// Favoriten-Rubrik auf der Startseite erscheint.
const FAVORITE_IDS = [27, 28, 96, 34];

// redux-persist (key 'root', whitelist ['favorites']) legt den Zustand auf Web
// über AsyncStorage -> localStorage unter 'persist:root' ab, jeder Slice doppelt
// JSON-kodiert.
const PERSISTED_STATE = JSON.stringify({
    favorites: JSON.stringify({ favorites: FAVORITE_IDS.map((id) => ({ id })) }),
    _persist: JSON.stringify({ version: -1, rehydrated: true }),
});

// Die Favoriten-Leiste erscheint erst, wenn die Themen aus der API geladen
// sind - beim ersten Aufruf in einem frischen Browser-Kontext dauert das
// länger als die pauschale Wartezeit.
const waitForFavoriten = (page) =>
    page.getByText('Favoriten', { exact: true }).waitFor({ timeout: 20000 });

// Screens, die für den Store gezeigt werden sollen (Pfad passend zum
// linking-Konfig in navigation/AppNavigation.tsx). `afterLoad` kann
// zusätzliche Interaktion simulieren (z. B. Drawer öffnen), bevor der
// Screenshot gemacht wird.
const SCREENS = [
    // Favoriten-Rubrik wird angezeigt, bleibt aber zugeklappt (Standardzustand).
    { name: '01-startseite', path: '/', waitFor: waitForFavoriten },
    { name: '02-kategorie-alltag', path: '/kategorie/alltag' },
    { name: '03-kategorie-schutz', path: '/kategorie/schutz' },
    // "Alltag" -> "Das Gedenken Gottes am Morgen und am Abend" (Thema-uid 27)
    { name: '04-bittgebet-detail', path: '/kategorie/alltag/27' },
    {
        name: '05-drawer-offen',
        path: '/',
        waitFor: waitForFavoriten,
        afterLoad: async (page) => {
            // Standard-Button des Drawer-Navigators (@react-navigation/drawer),
            // accessibilityLabel wird auf Web zu aria-label.
            await page.getByLabel('Show navigation menu').click();
            await page.waitForTimeout(600); // Drawer-Öffnen-Animation abwarten
        },
    },
];

async function shootFor(browser, target) {
    const outDir = path.resolve('mockups', target.key);
    await mkdir(outDir, { recursive: true });

    const context = await browser.newContext({
        viewport: target.viewport,
        deviceScaleFactor: target.deviceScaleFactor,
        isMobile: true,
        hasTouch: true,
        colorScheme: 'light',
    });
    await context.addInitScript((state) => {
        window.localStorage.setItem('persist:root', state);
    }, PERSISTED_STATE);
    const page = await context.newPage();

    for (const screen of SCREENS) {
        const url = BASE_URL + screen.path;
        console.log(`[${target.key}] ${screen.name} <- ${url}`);
        await page.goto(url, { waitUntil: 'networkidle' });
        // React-Navigation/Fonts/Bilder brauchen nach dem Laden noch etwas Zeit.
        await page.waitForTimeout(1500);

        if (screen.waitFor) {
            await screen.waitFor(page);
            await page.waitForTimeout(300);
        }

        if (screen.afterLoad) {
            await screen.afterLoad(page);
        }

        const outFile = path.join(outDir, `${screen.name}.png`);
        await page.screenshot({ path: outFile });
        console.log(`  -> ${outFile}`);
    }

    await context.close();
}

// Play Store Vorstellungsgrafik: 1024 x 500 px, PNG/JPEG, max. 15 MB.
// Wird aus App-Icon, Titel und zwei Telefon-Screenshots zusammengesetzt.
async function renderFeatureGraphic(browser) {
    const outDir = path.resolve('mockups', 'PlayStore-Vorstellungsgrafik');
    await mkdir(outDir, { recursive: true });

    const dataUri = async (file) =>
        'data:image/png;base64,' + (await readFile(path.resolve(file))).toString('base64');
    const icon = await dataUri('assets/images/icon-2026.png');
    const shotBack = await dataUri('mockups/PlayStore-Telefon/02-kategorie-alltag.png');
    const shotFront = await dataUri('mockups/PlayStore-Telefon/04-bittgebet-detail.png');

    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
        * { box-sizing: border-box; margin: 0; }
        body {
            width: 1024px; height: 500px; overflow: hidden; position: relative;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(120deg, #3f66da 0%, #4b78e6 55%, #2f52c0 100%);
            color: #fff;
        }
        .glow { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.08); }
        .text { position: absolute; left: 64px; top: 0; bottom: 0; width: 470px;
                display: flex; flex-direction: column; justify-content: center; }
        .icon { width: 96px; height: 96px; border-radius: 22px; margin-bottom: 28px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.25); border: 2px solid rgba(255,255,255,0.35); }
        h1 { font-size: 58px; font-weight: 300; line-height: 1.05; letter-spacing: -0.5px; }
        p { margin-top: 16px; font-size: 24px; font-weight: 400; line-height: 1.35; opacity: 0.92; }
        .phone { position: absolute; width: 230px; height: 409px; border-radius: 30px;
                 border: 8px solid #111; background: #111; overflow: hidden;
                 box-shadow: 0 24px 50px rgba(0,0,0,0.35); }
        .phone img { width: 100%; height: 100%; display: block; border-radius: 22px; }
        .back { left: 590px; top: 70px; transform: rotate(-6deg); opacity: 0.95; }
        .front { left: 760px; top: 40px; transform: rotate(4deg); }
    </style></head><body>
        <div class="glow" style="width:520px;height:520px;left:-160px;top:-260px"></div>
        <div class="glow" style="width:420px;height:420px;left:640px;top:260px"></div>
        <div class="text">
            <img class="icon" src="${icon}">
            <h1>Hisnul Muslim</h1>
            <p>Bittgebete und Gedenken für jeden Moment des Alltags</p>
        </div>
        <div class="phone back"><img src="${shotBack}"></div>
        <div class="phone front"><img src="${shotFront}"></div>
    </body></html>`;

    const context = await browser.newContext({ viewport: { width: 1024, height: 500 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const outFile = path.join(outDir, 'vorstellungsgrafik.png');
    await page.screenshot({ path: outFile });
    console.log(`[Vorstellungsgrafik] -> ${outFile}`);
    await context.close();
}

const browser = await chromium.launch();
try {
    for (const target of activeTargets) {
        await shootFor(browser, target);
    }
    if (!targetFilter || targetFilter.includes('PlayStore-Vorstellungsgrafik')) {
        await renderFeatureGraphic(browser);
    }
} finally {
    await browser.close();
}

console.log('Fertig.');

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Thema from '../interfaces/Thema';
import Bittgebete from '../interfaces/Bittgebet';

const API_URL = 'https://www.hisnulmuslim.de/api/';

// --- Rohtypen der neuen API (sys_category / Chapter / Dua / DuaItem) ---

interface ApiDuaItem {
  uid: number;
  sorting: number;
  type: string; // ar, ar_translation, ar_umschrift, dua, dua_translation, dua_umschrift,
                // quran, quran_translation, quran_umschrift, hadith, hadith_translation,
                // hadith_umschrift, hinweis, quelle
  content: string;
}

interface ApiDua {
  uid: number;
  duaId: number;
  chapterUid: number;
  items: ApiDuaItem[];
}

// Einmalige Migration: Cache-Einträge aus der alten (flachen) API-Struktur entfernen,
// damit auf den Geräten nicht dauerhaft veraltete Daten neben den neuen liegen.
const CACHE_SCHEMA_VERSION = 'sys_category-chapter-dua-duaitem-v1';
const CACHE_SCHEMA_VERSION_KEY = 'apiCacheSchemaVersion';

export const purgeLegacyCache = async (): Promise<void> => {
  const currentVersion = await AsyncStorage.getItem(CACHE_SCHEMA_VERSION_KEY);
  if (currentVersion === CACHE_SCHEMA_VERSION) {
    return;
  }

  await AsyncStorage.multiRemove(['kapiteln', 'themen', 'duas']);
  await AsyncStorage.setItem(CACHE_SCHEMA_VERSION_KEY, CACHE_SCHEMA_VERSION);
};

interface ApiChapter {
  uid: number;
  chapterId: number;
  title: string;
  titleAr: string;
  slug: string;
  duas?: ApiDua[];
}

interface ApiCategory {
  uid: number;
  parent: number | null;
  title: string;
  description: string;
  color: string;
  icon: string | null;
  chapters: ApiChapter[];
  children?: ApiCategory[];
}

interface ApiStructureResponse {
  categories: ApiCategory[];
}

interface ApiDuasResponse {
  duas: ApiDua[];
}

// Deduplication: mehrere Slices fragen die Baumstruktur beim Start parallel an,
// dafür soll nur ein HTTP-Request rausgehen.
let structureRequest: Promise<ApiStructureResponse> | null = null;

const fetchStructure = (): Promise<ApiStructureResponse> => {
  if (!structureRequest) {
    structureRequest = axios
      .get<ApiStructureResponse>(API_URL)
      .then((response) => response.data)
      .catch((error) => {
        structureRequest = null;
        throw error;
      });
  }
  return structureRequest;
};

// Läuft der Netzwerk-Request durch, wird das Ergebnis unter cacheKey abgelegt und
// zurückgegeben. Schlägt er fehl (z.B. kein Internet), wird stattdessen der zuletzt
// erfolgreich geladene Stand aus AsyncStorage zurückgegeben - die Inhalte (Kapitel,
// Themen, Bittgebete) müssen auch offline verfügbar sein.
async function loadWithOfflineFallback<T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> {
  try {
    const data = await fetcher();
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached) as T;
    }
    throw error;
  }
}

// Kapiteln (=hm_kategorien) -> Unterkategorien (=hm_unterkategorien) -> Themen (=hm)
export const getHMStruktur = async () => loadWithOfflineFallback('kapiteln', async () => {
  const { categories } = await fetchStructure();

  return categories.map((kategorie) => {
    const unterkategorien = (kategorie.children ?? []).map((unterkat) => ({
      id: unterkat.uid,
      unterkategorie: unterkat.title,
      parent: kategorie.uid,
      themen: unterkat.chapters.map((chapter) => ({
        id: chapter.uid,
        titel: chapter.title,
      })),
    }));

    // Themen, die direkt an der Hauptkategorie hängen (keine Unterkategorie) - der neue
    // Kategoriebaum erlaubt das explizit, braucht dafür aber trotzdem eine Überschrift,
    // sonst wirkt diese Gruppe wie ein unbeschrifteter Rest aus der alten Struktur.
    if (kategorie.chapters.length > 0) {
      unterkategorien.push({
        id: 0,
        unterkategorie: unterkategorien.length > 0 ? 'Weitere Themen' : kategorie.title,
        parent: kategorie.uid,
        themen: kategorie.chapters.map((chapter) => ({
          id: chapter.uid,
          titel: chapter.title,
        })),
      });
    }

    return {
      id: kategorie.uid,
      kategorie: kategorie.title,
      unterkategorien,
    };
  });
});

// Themen (=hm), flach - für Favoriten/Suche-Lookup per Thema-id
export const getKategorieData = async (): Promise<Thema[]> => loadWithOfflineFallback('themen', async () => {
  const { categories } = await fetchStructure();
  const themen: Thema[] = [];

  categories.forEach((kategorie) => {
    kategorie.chapters.forEach((chapter) => {
      themen.push({
        id: chapter.uid,
        kategorie: kategorie.uid,
        unterkategorie: 0,
        titel: chapter.title,
      });
    });

    (kategorie.children ?? []).forEach((unterkat) => {
      unterkat.chapters.forEach((chapter) => {
        themen.push({
          id: chapter.uid,
          kategorie: kategorie.uid,
          unterkategorie: unterkat.uid,
          titel: chapter.title,
        });
      });
    });
  });

  return themen;
});

// Jede Dua eines Kapitels behält ihre Items (type/content/sorting) roh bei - die
// typabhängige Aufbereitung (Arabisch/Übersetzung/Umschrift/Hinweis/Quelle, ggf.
// mehrere Blöcke pro Dua) übernimmt die <Bittgebet>-Komponente beim Rendern.
const mapDuaToBittgebet = (dua: ApiDua): Bittgebete => ({
  id: dua.uid,
  kapitel_id: dua.chapterUid,
  bittgebet_id: dua.duaId || dua.uid,
  items: dua.items
    .slice()
    .sort((a, b) => a.sorting - b.sorting)
    .map((item) => ({
      uid: item.uid,
      type: item.type,
      content: item.content,
      sorting: item.sorting,
    })),
});

// Bittgebete (=hm_duas): jede Dua eines Kapitels mit ihren rohen Items.
export const getBittgebete = async (): Promise<Bittgebete[]> => loadWithOfflineFallback('duas', async () => {
  const response = await axios.get<ApiDuasResponse>(`${API_URL}duas`);
  return response.data.duas.map(mapDuaToBittgebet);
});

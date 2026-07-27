export interface DuaContentItem {
    uid: number;
    type: string; // ar, ar_translation, ar_umschrift, dua, dua_translation, dua_umschrift,
                   // quran, quran_translation, quran_umschrift, hadith, hadith_translation,
                   // hadith_umschrift, hinweis, quelle
    content: string;
    sorting: number;
}

export default interface Bittgebete {
    id: number;
    kapitel_id: number;
    bittgebet_id: number;
    items: DuaContentItem[];
}

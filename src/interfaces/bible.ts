export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export interface BibleData {
  [bookName: string]: Chapter[];
}

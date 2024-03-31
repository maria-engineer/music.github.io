import { number } from "prop-types";
import React from "react";

export type BaseNote = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type ScaleType =
  | "NATURAL"
  | "HARMONIC"
  | "MAJOR"
  | "CHROMATIC"
  | "DIMINISHED"
  | "ALTERED";

export type Note = {
  base: BaseNote;
  modifier: number;
};

export type ChordType = "MINOR" | "MAJOR" | "DIMINISHED";

export type AddOn = {
  index: number;
  modifier: number;
};

export type Chord = {
  tonic: Note;
  type: ChordType;
  addOns: Array<AddOn>;
  substitution: BaseNote | null;
};

export type ChordSequence = {
  bars: Array<Bar>;
};

export type Bar = {
  chords: Array<Chord | undefined>;
};

const majorScale = [2, 2, 1, 2, 2, 2, 1];
const harmonicScale = [2, 1, 2, 2, 1, 3, 1];
const naturalScale = [2, 1, 2, 2, 1, 2, 2];
const chromaticScale = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const diminishedScale = [2, 1, 2, 1, 2, 1, 2, 1];
const alteredScale = [1, 2, 1, 2, 2, 2, 2];

export function getScale(root: Note, type: ScaleType): Array<Note> {
  const scale = [root];
  let order = [0];
  let preferFlats = false;
  switch (type) {
    case "CHROMATIC":
      order = chromaticScale;
      break;
    case "NATURAL":
      const major = getRelativeMajor(root);
      preferFlats =
        major.modifier == -1 || (major.base == "F" && major.modifier == 0);
      order = naturalScale;
      break;
    case "HARMONIC":
      const majorH = getRelativeMajor(root);
      preferFlats =
        majorH.modifier == -1 || (majorH.base == "F" && majorH.modifier == 0);
      order = harmonicScale;
      break;
    case "MAJOR":
      order = majorScale;
      preferFlats =
        root.modifier == -1 || (root.base == "F" && root.modifier == 0);
      break;
    case "DIMINISHED":
      order = diminishedScale;
      break;
    case "ALTERED":
      order = alteredScale;
  }
  let next = root;
  for (let times of order) {
    for (let i = 0; i < times; i++) {
      next = getNextSemitone(next, preferFlats);
    }
    scale.push(next);
  }
  return scale;
}

export function getRelativeMajor(a: Note): Note {
  let root = a;
  for (let i = 0; i < 3; i++) {
    root = getNextSemitone(root, true);
  }
  return root;
}

export function getRelativeMinor(a: Note): Note {
  let root = a;
  for (let i = 0; i < 3; i++) {
    root = getPrevSemitone(root, true);
  }
  return root;
}

export function getNextSemitone(a: Note, preferFlats: boolean): Note {
  if (a.modifier == -1) {
    return { base: a.base, modifier: 0 };
  }
  if (a.modifier == 1) {
    // Some notes do not have independent sharps == Next Note
    if (a.base == "E" || a.base == "B") {
      if (preferFlats) {
        return { base: getNextBase(getNextBase(a.base)), modifier: -1 };
      } else {
        return { base: getNextBase(a.base), modifier: 1 };
      }
    }
    return { base: getNextBase(a.base), modifier: 0 };
  }
  if (a.base == "E" || a.base == "B") {
    return { base: getNextBase(a.base), modifier: 0 };
  }
  if (preferFlats) {
    return { base: getNextBase(a.base), modifier: -1 };
  } else {
    return { base: a.base, modifier: 1 };
  }
}

export function getPrevSemitone(a: Note, preferFlats: boolean): Note {
  if (a.modifier == 1) {
    return { base: a.base, modifier: 0 };
  }
  if (a.modifier == -1) {
    // Some notes do not have independent flats == Next Note
    if (a.base == "F" || a.base == "C") {
      if (preferFlats) {
        return { base: getPrevBase(a.base), modifier: -1 };
      } else {
        return { base: getPrevBase(a.base), modifier: 0 };
      }
    }
    return { base: getPrevBase(a.base), modifier: 0 };
  }

  if (a.base == "F" || a.base == "C") {
    return { base: getPrevBase(a.base), modifier: 0 };
  }
  if (preferFlats) {
    return { base: a.base, modifier: -1 };
  } else {
    return { base: getPrevBase(a.base), modifier: 1 };
  }
}

function getNextBase(a: BaseNote): BaseNote {
  if (a == "G") {
    return "A";
  }
  return String.fromCharCode(a.charCodeAt(0) + 1) as BaseNote;
}

function getPrevBase(a: BaseNote): BaseNote {
  if (a == "A") {
    return "G";
  }
  return String.fromCharCode(a.charCodeAt(0) - 1) as BaseNote;
}

export function toStringFromNote(a: Note): string {
  return a.base + sharpOrFlat(a);
}

export function toStringFromChord(a: Chord): string {
  let base = toStringFromNote(a.tonic) + toStringFromChordType(a.type);
  for (let addOn of a.addOns) {
    base = base + toStringFromAddOn(addOn);
  }
  if (a.substitution !== null) {
    base = base + "/" + a.substitution;
  }
  return base;
}

export function toStringFromChordType(a: ChordType): string {
  switch (a) {
    case "MAJOR":
      return "";
    case "MINOR":
      return "-";
    case "DIMINISHED":
      return "dim";
  }
}

export function toStringFromAddOn(a: AddOn): string {
  if (a.index == 7) {
    const base = "7";
    if (a.modifier == 0) {
      return "maj" + base;
    }
    if (a.modifier == -1) {
      return base;
    }
    return "8";
  } else {
    const base = a.index > 5 ? a.index.toString() : (a.index + 8).toString();
    if (base.length > 1) {
      if (a.modifier == 0) {
        return "(" + base + ")";
      }
      if (a.modifier == -1) {
        return "(" + "b" + base + ")";
      }
      return "(" + "#" + base + ")";
    }
    if (a.modifier == 0) {
      return base;
    }
    if (a.modifier == -1) {
      return "b" + base;
    }
    return "#" + base;
  }
}

export function sharpOrFlat(note: Note): string {
  if (note.modifier == 0) {
    return "";
  }
  if (note.modifier == 1) {
    return "\u266F";
  }
  if (note.modifier == -1) {
    return "\u266D";
  }
  return "";
}

export function fromStringToNote(a: string): Note {
  console.log("NoteParse:" + a + "\n");
  if (a.length > 2) {
    throw "Invalid Note";
  }
  const base = String.fromCharCode(a.charCodeAt(0)) as BaseNote;
  if (!["A", "B", "C", "D", "E", "F", "G"].includes(base)) {
    console.log("Wrong Base:" + base);
    throw "Invalid Note";
  }
  if (a.length == 1) {
    return {
      base: base,
      modifier: 0,
    };
  }
  const modifier =
    a.charAt(1) === "#" || a.charAt(1) == "\u266F"
      ? 1
      : a.charAt(1) === "b" || a.charAt(1) == "\u266D"
      ? -1
      : 0;
  if (modifier == 0 && a.length > 1) {
    throw "Invalid note";
  }
  return {
    base: base,
    modifier: modifier,
  };
}

const chordsTypes = {
  dim: "DIMINISHED",
  h: "DIMINISHED",
  "\u0394": "DIMINISHED",
  min: "MINOR",
  "-": "MINOR",
  minor: "MINOR",
  M: "MAJOR",
};
const addOnRegex = /^(sus|maj7|\^7|add\d+|(#|\u266F|\u266D|b)?\d|\((#|\u266F|\u266D|b)?\d+\))/gm;
const noteRegex = "^(A|B|C|D|E|F|G)(#|\u266F|\u266D|b)?";

export function fromStringToChord(a: string): Chord {
  const note = a.match(noteRegex);
  if (note == null || note.length == 0) {
    console.log(a);
    throw "Invalid Chord";
  }
  const tonic = fromStringToNote(note[0]);
  let chord = a.slice(note[0].length);
  console.log("Note Excluded:" + chord);
  let type = "MAJOR";
  let foundkey = "";
  for (var key in chordsTypes) {
    if (chordsTypes.hasOwnProperty(key)) {
      if (chord.startsWith(key)) {
        console.log("starts with " + key);
        type = chordsTypes[key] as ChordType;
        foundkey = key;
      }
    }
  }
  chord = chord.slice(foundkey.length);
  let addOns: Array<AddOn> = [];
  while (chord.length > 0) {
    let matches = chord.match(addOnRegex);
    console.log("Match:" + JSON.stringify(matches) + "\n");
    if (matches != null) {
      const match = matches[0];
      if (match.startsWith("(")) {
        addOns.push(fromStringToAddOn(match.slice(1, match.length - 1)));
      } else {
        addOns.push(fromStringToAddOn(match));
      }
      chord = chord.slice(match.length);
    } else {
      throw "Invalid Chord";
    }
  }
  let substitution: BaseNote | null = null;
  let submatches = a.match("\/(A|B|C|D|E|F|G)$");
  if (submatches!= null) {
    substitution = submatches[0] as BaseNote;
  }
  return {
    tonic: tonic,
    type: type as ChordType,
    addOns: addOns,
    substitution: substitution,
  };
}

function fromStringToAddOn(a: string): AddOn {
  if (a.length < 1) {
    throw "Invalid";
  }
  if (a.startsWith("maj")) {
    return { index: 7, modifier: 0 };
  }
  if (a.startsWith("sus")) {
    return { index: 4, modifier: 0 };
  }
  if (a.startsWith("7")) {
    return { index: 7, modifier: -1 };
  }
  if (a.startsWith("^")) {
    return { index: 7, modifier: 0 };
  }
  let index = 1;
  let modifier = 0;
  if (
    a.charAt(0) === "#" ||
    a.charAt(0) == "\u266F" ||
    a.charAt(0) === "b" ||
    a.charAt(0) == "\u266D"
  ) {
    index = parseInt(a.slice(1));
    modifier = a.charAt(0) === "#" || a.charAt(0) == "\u266F" ? 1 : -1;
  }
  if (a.startsWith("add")) {
    index = parseInt(a.slice(3));
    modifier = 0;
  } else {
    index = parseInt(a);
    modifier = 0;
  }
  if (index == 0 || index == 1 || index == 8 || index == null) {
    throw "invalid";
  }
  return {
    index: index,
    modifier: modifier,
  };
}

export function getChordNotes(c: Chord): Array<Note> {
  const majorScale = getScale(c.tonic, "MAJOR");
  var scale: Note[] = [];
  switch (c.type) {
    case "DIMINISHED":
      scale = getScale(c.tonic, "DIMINISHED");
      break;
    case "MAJOR":
      scale = majorScale;
      break;
    case "MINOR":
      scale = getScale(c.tonic, "NATURAL");
      break;
  }
  var notes: Array<Note> = [
    substituteBase(scale[0], c.tonic.base, c.substitution),
    substituteBase(scale[2], c.tonic.base, c.substitution),
    substituteBase(scale[4], c.tonic.base, c.substitution),
  ];
  for (var addOn of c.addOns) {
    const inNoteScale =
      addOn.index < majorScale.length
        ? addOn.index - 1
        : addOn.index % majorScale.length;
    if (addOn.modifier == 0) {
      notes.push(majorScale[inNoteScale]);
    } else {
      if (addOn.modifier == -1) {
        notes.push(substituteBase(getPrevSemitone(majorScale[inNoteScale], true), c.tonic.base, c.substitution));
      } else {
        notes.push(substituteBase(getNextSemitone(majorScale[inNoteScale], false), c.tonic.base, c.substitution));
      }
    }
  }
  return notes;
}

function substituteBase(n: Note, chord: BaseNote, sub: BaseNote | null): Note {
    if (sub === null) {
        return n;
    }
  if (n.base == chord) {
    return { base: sub, modifier: n.modifier };
  }
  return n;
}

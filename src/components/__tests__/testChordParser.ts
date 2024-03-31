import {
  fromStringToChord,
  Chord,
  getChordNotes,
  toStringFromNote,
} from "../utils";

describe("Chord parser test", () => {
  const cases: Array<[string, Chord]> = [
    ["C", { tonic: { base: "C", modifier: 0 }, type: "MAJOR", addOns: [], substitution: null }],
    ["C/A", { tonic: { base: "C", modifier: 0 }, type: "MAJOR", addOns: [], substitution: "A" }]
  ];
  test.each(cases)("test %p parses correctly", (arg: string, res: Chord) => {
    expect(fromStringToChord(arg)).toEqual(res);
  });
});

describe("Chord end-to-end test", () => {
  const cases: Array<[string, Array<string>]> = [
    ["C", ["C", "E", "G"]],
    ["Bb7", ["B♭", "D", "F", "A♭"]],
    ["G#maj7", ["G♯", "C", "D♯", "G"]],
    ["G#maj7add11", ["G♯", "C", "D♯", "G", "C♯"]],
    ["A^7", ["A", "C♯", "E", "G♯"]],
    ["A-maj7", ["A", "C", "E", "G♯"]],
    ["Aminorsus", ["A", "C", "E", "D"]],
    ["C/A", ["A", "E", "G"]]
  ];
  test.each(cases)(
    "test %p returns the right notes",
    (arg: string, res: Array<string>) => {
      const chord = fromStringToChord(arg);
      const notes = getChordNotes(chord);
      const stringNotes = notes.map((n) => toStringFromNote(n));
      expect(stringNotes).toEqual(res);
    }
  );
});

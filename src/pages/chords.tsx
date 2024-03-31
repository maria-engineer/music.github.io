import React from "react";
import {
  Note as NoteType,
  Chord as ChordType,
  getChordNotes,
  ChordSequence as ChordSequenceType,
  fromStringToChord,
  getNextSemitone,
  getPrevSemitone,
  fromStringToNote,
  toStringFromNote,
} from "../components/utils";
import { useState } from "react";
import Scale from "../components/scale";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Chord from "../components/chord";
import Note from "../components/note";
import { Button, Control, Card, BigInput, InputWrapper } from "../components/commonStyles";

const iRealReader = require("ireal-reader");

import styled from "@emotion/styled";

const A4Paper = styled.div`
  width: 1095px;
  min-height: 1880px;
  background-color: white;
  padding: 50px 40px 10px 40px;
  justify-items: start;
`;

const SongTitle = styled.div`
  font-size: xxx-large;
  font-style: bold;
  text-align: center;
  color: black;
`;

const SongKey = styled.div`
  color: black;
  text-align: left;
  font-size: medium;
`;

const BarDiv = styled.div`
  width: 250px;
  border-right: 1px;
  border-left: 2px;
  border-top: 0px;
  border-bottom: 0px;
  border-color: black;
  margin-right: -1px;
  height: 60px;
  margin-bottom: 5px;
  display: flex;
  font-size: auto;
  color: black;
  border-style: solid;
  flex-wrap: nowrap;
  justify-content: stretch;
  align-content: center;
`;

const ChordDiv = styled.div`
  color: black;
  text-align: left;
  margin-right: 6px;
  display: flex;
  justify-content: stretch;
  word-wrap: nowrap;
  flex-wrap: nowrap;
  align-self: center;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 20px;
`;

const Warning = styled.div`
  color: red;
`;

export default function ChordPage(): JSX.Element {
  const [topChord, setTopChord] = useState<ChordType>({
    tonic: { base: "C", modifier: 0 },
    type: "MAJOR",
    addOns: [],
    substitution: null,
  });

  return (
    <Layout currentPage="Chords" >
      <SEO
        title="Chords"
        description={
          "Given chord find all the notes you can play in jazz improv."
        }
        keywords={[
          "music",
          "theory",
          "chords",
          "ireal",
          "song",
          "improvise",
          "jazz improvisation",
          "note generation",
          "translate",
          "what notes can I use",
          "jazz",
          "generate",
          "notes",
          "improv",
          "jazz improvisation chord generation",
        ]}
      />
      <div>
        <h2>Main Chord</h2>
        <p>
          <Chord chord={topChord} setChord={setTopChord} />
        </p>
      </div>
      <div>
        <h2>Available Notes:</h2>
        <div>
          <Card>
            <div className="card-body">
              <Scale notes={getChordNotes(topChord)} />
            </div>
          </Card>
        </div>
      </div>
      <div>
        <h2>Full Song</h2>
        <p>
          <ChordSequence />
        </p>
      </div>
    </Layout>
  );
}

function ChordSequence(): JSX.Element {
  const [url, setUrl] = useState<string | null>(() => {
    var stickyValue: string | null = null;
    if (typeof window !== "undefined") {
      stickyValue = window.localStorage.getItem("ireal-url");
    }
    if (stickyValue) {
      return stickyValue;
    }
    return null;
  });
  const [song, setSong] = useState<ChordSequenceType | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [hadError, setError] = useState<boolean>(false);
  const [key, setKey] = useState<NoteType | undefined>(undefined);

  const getSong = () => {
    try{
    const parseResult = iRealReader(url);
    if (parseResult && url) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("ireal-url", url);
      }

      const songResult = parseResult.songs[0];
      const bars = songResult.music.measures as Array<Array<string>>;
      setKey(fromStringToNote(songResult.key));
      setSong({
        bars: bars.map((bar) => {
          return {
            chords: bar.map(
              (chordString) => fromStringToChord(chordString) ?? null
            ),
          };
        }),
      });
      setTitle(songResult.title);
    } 
    }catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="align-self-center mr-5">iReal URL:{"  "}</div>

        <InputWrapper>
        <BigInput
          type="text"
          className="lcars-form-control lcars-big-input"
          placeholder={url ?? ""}
          aria-label="Note"
          aria-describedby="basic-addon1"
          onChange={(e) => {setUrl(e.target.value); setError(false);}}
        />
        {hadError && <Warning>Unsupported Song.</Warning>}
        </InputWrapper>
        <Button
          className={!url ? "c46" : "orange"}
          disabled={url === null}
          onClick={getSong}
        >
          Process
        </Button>
      </div>
      <div>
        <Warning>WARNING: This feature is unstable when the song is not supported </Warning>
        To get the right url to paste here, go to the{" "}
        <a target="_blank" href="https://www.irealb.com/forums/forumdisplay.php?3-Songs">
          iReal forum
        </a>
        , and find the song you like. Once you have found it you can right click
        and copy the url, then you can paste it here. I have not yet implemented
        all the functionalities of the iReal app, so some notes may be missing.
      </div>
      {key && (
        <A4Paper id="a4-print-song">
          <SongTitle>{title ?? "Unknown"}</SongTitle>
          <SongKey className="d-flex flex-row justify-content-start align-content-center">
            <Control
              className={!song || !key ? "c46" : "orange"}
              disabled={!song || !key}
              onClick={() => {
                setSong({
                  bars: song!.bars.map((bar) => {
                    return {
                      chords: bar!.chords.map((c) => {
                        return c ? transposeChordDown(c) : c;
                      }),
                    };
                  }),
                });
                setKey(getPrevSemitone(key!, true));
              }}
            >
              Transpose down
            </Control>
            <Control
              className={!song || !key ? "c46" : "orange"}
              disabled={!song || !key}
              onClick={() => {
                setSong({
                  bars: song!.bars.map((bar) => {
                    return {
                      chords: bar!.chords.map((c) => {
                        return c ? transposeChordUp(c) : c;
                      }),
                    };
                  }),
                });
                setKey(getNextSemitone(key!, true));
              }}
            >
              Transpose up
            </Control>
            <div>
              {" In the key of "}
              {toStringFromNote(key)}
            </div>
          </SongKey>

          {song && <Song data={song} />}
        </A4Paper>
      )}
    </div>
  );
}

function Song({ data }: { data: ChordSequenceType }): JSX.Element {
  if (data === null) {
    return <div />;
  }

  return (
    <div className="flex-wrap d-flex flex-row">
      {data.bars.map((a) => {
        return (
          <BarDiv>
            {a.chords.map((c) => {
              const notes = c === undefined ? undefined : getChordNotes(c);
              if (c === undefined || notes === undefined || notes.length === 0)
                return <ChordDiv />;
              return (
                <ChordDiv>
                  {notes.map((n) => (
                    <>
                      <Note note={n} setNote={null} />{" "}
                    </>
                  ))}
                </ChordDiv>
              );
            })}
          </BarDiv>
        );
      })}
    </div>
  );
}

function transposeChordDown(chord: ChordType): ChordType {
  return {
    tonic: getPrevSemitone(chord.tonic, true),
    type: chord.type,
    addOns: chord.addOns,
    substitution: null,
  };
}

function transposeChordUp(chord: ChordType): ChordType {
  return {
    tonic: getNextSemitone(chord.tonic, false),
    type: chord.type,
    addOns: chord.addOns,
    substitution: null
  };
}

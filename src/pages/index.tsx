import type { HeadFC, PageProps } from "gatsby";
import React from "react";
import {
  Note as NoteType,
  getScale,
  getRelativeMajor,
  getRelativeMinor,
} from "../components/utils";
import { useState } from "react";
import Scale from "../components/scale";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Note from "../components/note";
import { RelativeControl, Card } from "../components/commonStyles";import styled from "@emotion/styled";

const Big = styled.div`
  font-size: x-large;
`;

const IndexPage: React.FC<PageProps> = () => {
  const [topNote, setTopNote] = useState<NoteType>({ base: "C", modifier: 0 });
  const relativeMinor = getRelativeMinor(topNote);
  const relativeMajor = getRelativeMajor(topNote);
  return (
    <Layout currentPage="Scales" >
      <SEO
        title="Scales"
        description={"Generate the scales for a note, and the relative scales"}
        keywords={[
          "music",
          "theory",
          "scales",
          "generate",
          "relative",
          "minor",
          "major",
          "notes",
          "dominant",
        ]}
      />
      <div className="d-flex flex-wrap">
        <div className="pr-2">
          <h2>Main Note</h2>
          <p>
            <Note note={topNote} setNote={setTopNote} />
          </p>
        </div>
        <div className="align-self-end">
          <p>
            <div className="buttons">
              <RelativeControl
                onClick={() => setTopNote(relativeMinor)}

                aria-label="Click for Relative Minor"
              >
                <div className="d-flex flex-column mb-2">
                  <div>Relative Minor:</div>
                  <Big><Note note={relativeMinor} setNote={null} /></Big>
                </div>
              </RelativeControl>
            </div>
          </p>
        </div>
        <div className="align-self-end">
          <p>
            <div >
              <RelativeControl
                onClick={() => setTopNote(relativeMajor)}
                aria-label="Click for Relative Major"
              >
                {" "}
                <div className="d-flex flex-column mb-2">
                  <div>Relative Major: </div>
                  <Big><Note note={relativeMajor} setNote={null} /></Big>
                </div>
              </RelativeControl>
            </div>
          </p>
        </div>
      </div>
      <div>
        <h2>Major Scale</h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "MAJOR")} />
            </div>
          </Card>
        </p>
      </div>
      <div>
        <h2>Natural Minor Scale</h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "NATURAL")} />
            </div>
          </Card>
        </p>
      </div>

      <div>
        <h2> Harmonic Minor Scale </h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "HARMONIC")} />
            </div>
          </Card>
        </p>
      </div>
      <div>
        <h2> Chromatic Scale </h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "CHROMATIC")} />
            </div>
          </Card>
        </p>
      </div>
      <div>
        <h2> Diminished Scale </h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "DIMINISHED")} />
            </div>
          </Card>
        </p>
      </div>
      <div>
        <h2> Altered Scale </h2>
        <p>
          <Card>
            <div className="card-body">
              <Scale notes={getScale(topNote, "ALTERED")} />
            </div>
          </Card>
        </p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Music</title>;

import {
  Chord as ChordType,
  fromStringToChord,
  toStringFromChord,
  getNextSemitone,
  getPrevSemitone,
} from "./utils";
import React from "react";

import { useState } from "react";
import { Control, NoteInput } from "./commonStyles";

import styled from "@emotion/styled";

const Warning = styled.div`
border-color: #668;
color: red;
padding-left: 30px;
`;

const InputWrapper = styled.div`
  height: 80px;
`

interface ChordProps {
  chord: ChordType;
  setChord?: (a: ChordType) => void;
}


function Chord(props: ChordProps): JSX.Element {
  if (props.setChord == null) {
    return (
      <h2 className="d-flex bd-highlight px-2">
        {toStringFromChord(props.chord)}
      </h2>
    );
  } else {
    const [isValid, setIsValid] = useState<boolean>(true);
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        props.setChord && props.setChord(fromStringToChord(event.target.value));
        setIsValid(true);
      } catch (errror) {
        setIsValid(false);
      }
    };
    return (
      <div className="buttons d-flex flex-row mb-3 ml-3">
        <InputWrapper>
        <NoteInput
          type="text"
          
          placeholder={toStringFromChord(props.chord)}
          aria-label="Note"
          aria-describedby="basic-addon1"
          onChange={changeValue}
        />    {
          !isValid && <Warning>invalid chord</Warning>
        }
        </InputWrapper>
        <Control
          disabled={!isValid}
          onClick={() =>
            props.setChord!({
              tonic: getPrevSemitone(props.chord.tonic, true),
              type: props.chord.type,
              addOns: props.chord.addOns,
              substitution: props.chord.substitution
            })
          }
        >
          Transpose down
        </Control>
        <Control
          disabled={!isValid}
          onClick={() =>
            props.setChord!({
              tonic: getNextSemitone(props.chord.tonic, false),
              type: props.chord.type,
              addOns: props.chord.addOns,
              substitution: props.chord.substitution
            })
          }
        >
          Transpose up
        </Control>
      </div>
    );
  }
}

export default Chord;

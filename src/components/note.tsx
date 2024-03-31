import { Note as NoteType, toStringFromNote, fromStringToNote } from "./utils";
import React from "react";
import { useState } from "react";
import { NoteInput } from "./commonStyles";

import styled from "@emotion/styled";

const Warning = styled.div`
border-color: #668;
color: red;
padding-left: 30px;
`;

const InputWrapper = styled.div`
  height: 80px;
`;


function Note(props: {
  note: NoteType;
  setNote: ((NoteType) => void) | null;
}): JSX.Element {
  if (props == null || props.setNote == null) {
    return <>{toStringFromNote(props.note)}</>;
  }
  const [isValid, setIsValid] = useState<boolean>(true);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      props.setNote!(fromStringToNote(event.target.value));
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };
  return (
    <InputWrapper >
    <NoteInput
      type="text"
      placeholder={toStringFromNote(props.note)}
      aria-label="Note"
      aria-describedby="basic-addon1"
      onChange={changeValue}
    />
    {
      !isValid && <Warning>invalid note</Warning>
    }
    </InputWrapper>
  );
}

export default Note;

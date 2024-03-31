import { Note as NoteType } from "./utils";
import React from "react";
import Note from "./note";

export default function Scale(props: { notes: Array<NoteType> }): JSX.Element {
  const notes = props.notes;
  if (notes == null) {
    return <div />;
  }
  return (
    <div className="d-inline-flex flex-wrap pl-2 pr-2 bd-highlight ">
      {notes.map((note, index) => {
        return (
          <h2 className="d-flex bd-highlight px-2">
            <Note key={index} note={note} setNote={null} />
          </h2>
        );
      })}
    </div>
  );
}

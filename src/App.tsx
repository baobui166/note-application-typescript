import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./assets/components/NewNote";
import { useMemo } from "react";
import useLocalStorage from "./assets/utils/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./assets/components/NoteList";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((pre) => [
      ...pre,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  }

  function onAddTag(tag: Tag) {
    setTags((pre) => [...pre, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<h1>new</h1>}>
          <Route index element={<h2>show</h2>}></Route>
          <Route path="edit" element={<h2>edit</h2>}></Route>
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}

export default App;

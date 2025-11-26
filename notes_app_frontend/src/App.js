import React, { useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import useLocalStorage from './hooks/useLocalStorage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Notes app with localStorage persistence.
   * Manages notes: Array<{id, title, content, createdAt, updatedAt}>
   * Also stores selectedNoteId, searchQuery, and theme.
   */
  const [notes, setNotes] = useLocalStorage('notes_app.notes', []);
  const [selectedNoteId, setSelectedNoteId] = useLocalStorage('notes_app.selectedNoteId', null);
  const [searchQuery, setSearchQuery] = useLocalStorage('notes_app.searchQuery', '');
  const [theme, setTheme] = useLocalStorage('notes_app.theme', 'light');

  // Apply theme to document root
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const filteredSortedNotes = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    const filtered = notes.filter(n => {
      const t = (n.title || '').toLowerCase();
      const c = (n.content || '').toLowerCase();
      return t.includes(q) || c.includes(q);
    });
    return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [notes, searchQuery]);

  // PUBLIC_INTERFACE
  const createNote = () => {
    const now = new Date().toISOString();
    const newNote = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, data) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, ...data, updatedAt: new Date().toISOString() }
          : n
      )
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id);
    const title = note?.title?.trim() ? `"${note.title.trim()}"` : 'this note';
    // Confirm before deleting
    const ok = window.confirm(`Are you sure you want to delete ${title}?`);
    if (!ok) return;
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  // PUBLIC_INTERFACE
  const selectNote = (id) => {
    setSelectedNoteId(id);
  };

  // PUBLIC_INTERFACE
  const clearSelection = () => {
    setSelectedNoteId(null);
  };

  const handleSave = (payload) => {
    if (!selectedNote) return;
    updateNote(selectedNote.id, payload);
  };

  const handleCancel = () => {
    clearSelection();
  };

  return (
    <div className="app-root">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <main className="app-main">
        <section className="sidebar">
          <div className="sidebar-actions">
            <button
              className="btn btn-primary fab"
              onClick={createNote}
              aria-label="Create new note"
              title="Create new note"
            >
              +
            </button>
          </div>
          <NotesList
            notes={filteredSortedNotes}
            selectedId={selectedNoteId}
            onSelect={selectNote}
            onDelete={deleteNote}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>
        <section className="editor">
          <NoteForm
            note={selectedNote}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={() => selectedNote && deleteNote(selectedNote.id)}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm displays the editor for the selected note.
 */
function NoteForm({ note, onSave, onCancel, onDelete }) {
  const [title, setTitle] = React.useState(note?.title || '');
  const [content, setContent] = React.useState(note?.content || '');

  React.useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]); // reset when switching notes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note) return;
    onSave?.({ title, content });
  };

  if (!note) {
    return (
      <div className="editor empty-state" aria-live="polite">
        Select a note from the list or create a new one to start editing.
      </div>
    );
    }

  return (
    <div className="editor">
      <form className="editor-inner" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Note title"
          aria-label="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="Write your note..."
          aria-label="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="editor-actions">
          <button
            type="submit"
            className="btn btn-success"
            aria-label="Save note"
            title="Save note"
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setTitle(note.title || '');
              setContent(note.content || '');
              onCancel?.();
            }}
            aria-label="Cancel editing"
            title="Cancel editing"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete?.(note.id)}
            aria-label="Delete note"
            title="Delete note"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;

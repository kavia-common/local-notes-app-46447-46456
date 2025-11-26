import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteItem renders a single note preview row.
 */
function NoteItem({ note, selected, onClick, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(note.id);
  };

  const updated = new Date(note.updatedAt);
  const dateStr = isNaN(updated) ? '' : updated.toLocaleString();

  return (
    <div
      className={`note-item ${selected ? 'selected' : ''}`}
      onClick={() => onClick?.(note.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.(note.id);
      }}
      aria-pressed={selected}
      aria-label={`Open note ${note.title || 'Untitled'}`}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 className="note-item-title">{note.title?.trim() || 'Untitled'}</h4>
        <p className="note-item-content">
          {note.content?.trim() || 'No content yet'}
        </p>
        <div className="note-item-meta">Updated: {dateStr}</div>
      </div>
      <div className="note-item-actions">
        <button
          className="btn btn-ghost"
          onClick={handleDelete}
          aria-label="Delete note"
          title="Delete note"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default NoteItem;

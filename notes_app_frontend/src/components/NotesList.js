import React from 'react';
import NoteItem from './NoteItem';

/**
 * PUBLIC_INTERFACE
 * NotesList renders the search box and the list of notes.
 */
function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="notes-list-root" style={{ display: 'contents' }}>
      <div className="notes-search">
        <input
          type="search"
          placeholder="Search notes..."
          aria-label="Search notes"
          value={searchQuery || ''}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      <div className="notes-list" role="list" aria-label="Notes list">
        {notes.length === 0 ? (
          <div className="empty-state">No notes yet. Click + to create one.</div>
        ) : (
          notes.map((n) => (
            <NoteItem
              key={n.id}
              note={n}
              selected={n.id === selectedId}
              onClick={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;

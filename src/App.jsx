import { useEffect, useState } from "react";
import DiaryCard from "./components/DiaryCard";
import AddEntryModal from "./components/AddEntryModal";
import EntryModal from "./components/EntryModal";

function App() {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem("diaryEntries");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    const existingEntry = entries.find((entry) => entry.date === newEntry.date);

    if (existingEntry) {
      alert("Du hast heute bereits einen Eintrag erstellt.");
      return;
    }

    const updatedEntries = [...entries, newEntry].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    setEntries(updatedEntries);
    setShowAddModal(false);
  };

  const updateEntry = (updatedEntry) => {
    const updatedEntries = entries
      .map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setEntries(updatedEntries);
    setEditingEntry(null);
  };

  const deleteEntry = (id) => {
    const confirmDelete = window.confirm(
      "Möchtest du diesen Eintrag wirklich löschen?",
    );

    if (!confirmDelete) return;

    setEntries(entries.filter((entry) => entry.id !== id));
    setSelectedEntry(null);
  };

  const latestDate = entries.length > 0 ? entries[0].date : "Noch kein Eintrag";

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-16">
          <h1 className="font-serif text-6xl md:text-7xl leading-tight">
            Mira's Tagebuch
          </h1>

          <p className="mt-6 text-gray-500 text-lg max-w-xl">
            Ein bisschen Journaling dies das.
          </p>
        </div>

        <div className="flex gap-4 mb-12 flex-wrap">
          <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100">
            <p className="text-sm text-gray-500">Einträge</p>
            <p className="text-2xl font-semibold">{entries.length}</p>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100">
            <p className="text-sm text-gray-500">Letzter Eintrag</p>
            <p className="text-lg font-semibold">{latestDate}</p>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="font-serif text-4xl">Noch keine Einträge</h2>

            <p className="text-gray-500 mt-4">
              Erstelle deinen ersten Tagebucheintrag.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((entry) => (
              <DiaryCard
                key={entry.id}
                entry={entry}
                onClick={() => setSelectedEntry(entry)}
              />
            ))}
          </div>
        )}

        {showAddModal && (
          <AddEntryModal
            onClose={() => setShowAddModal(false)}
            onAdd={addEntry}
          />
        )}

        {editingEntry && (
          <AddEntryModal
            editingEntry={editingEntry}
            onClose={() => setEditingEntry(null)}
            onUpdate={updateEntry}
          />
        )}

        {selectedEntry && (
          <EntryModal
            entry={selectedEntry}
            onClose={() => setSelectedEntry(null)}
            onEdit={() => {
              setEditingEntry(selectedEntry);
              setSelectedEntry(null);
            }}
            onDelete={() => deleteEntry(selectedEntry.id)}
          />
        )}
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="
        fixed
        bottom-8
        right-8
        w-16
        h-16
        rounded-full
        bg-black
        text-white
        text-3xl
        shadow-lg
        hover:opacity-90
        transition
        "
      >
        +
      </button>
    </div>
  );
}

export default App;

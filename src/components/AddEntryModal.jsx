import { useState } from "react";

function AddEntryModal({ onClose, onAdd, editingEntry, onUpdate }) {
  const [form, setForm] = useState(
    editingEntry || {
      title: "",
      date: "",
      imageUrl: "",
      content: "",
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      form.title.trim() &&
      form.date.trim() &&
      form.content.trim() &&
      form.imageUrl.trim();

    if (!isValid) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }

    if (editingEntry) {
      onUpdate(form);
    } else {
      onAdd({
        id: Date.now(),
        ...form,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div
        className="
        bg-white/95
        backdrop-blur-xl
        rounded-3xl
        p-8
        w-full
        max-w-xl
        shadow-xl
        "
      >
        <h2 className="font-serif text-4xl mb-8">
          {editingEntry ? "Eintrag bearbeiten" : "Neuer Eintrag"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titel"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-200
            p-3
            rounded-xl
            outline-none
            "
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-200
            p-3
            rounded-xl
            outline-none
            "
          />

          <input
            type="url"
            placeholder="Bild-URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({
                ...form,
                imageUrl: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-200
            p-3
            rounded-xl
            outline-none
            "
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Vorschau"
              className="
              w-full
              h-48
              object-cover
              rounded-2xl
              "
            />
          )}

          <textarea
            rows="6"
            placeholder="Deine Gedanken..."
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            className="
            w-full
            border
            border-gray-200
            p-3
            rounded-xl
            outline-none
            resize-none
            "
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
              px-5
              py-2
              rounded-full
              border
              border-gray-300
              "
            >
              Abbrechen
            </button>

            <button
              type="submit"
              className="
              px-5
              py-2
              rounded-full
              bg-black
              text-white
              "
            >
              {editingEntry ? "Aktualisieren" : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
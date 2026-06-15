function EntryModal({ entry, onClose, onEdit, onDelete }) {
  return (
    <div
      className="
      fixed
      inset-0
      bg-black/30
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
      z-50
      "
    >
      <div
        className="
        bg-white/95
        backdrop-blur-xl
        rounded-3xl
        overflow-hidden
        max-w-4xl
        w-full
        shadow-xl
        max-h-[90vh]
        overflow-y-auto
        "
      >
        <img
          src={entry.imageUrl}
          alt={entry.title}
          className="
          w-full
          h-80
          md:h-96
          object-cover
          "
        />

        <div className="p-8">
          <p className="text-sm text-gray-500 mb-2">{entry.date}</p>

          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            {entry.title}
          </h2>

          <div
            className="
            text-gray-700
            leading-8
            whitespace-pre-wrap
            "
          >
            {entry.content}
          </div>

          <div className="flex flex-wrap gap-3 mt-10">
            <button
              onClick={onEdit}
              className="
              px-5
              py-2
              rounded-full
              border
              border-gray-300
              hover:bg-gray-50
              transition
              "
            >
              Bearbeiten
            </button>

            <button
              onClick={onDelete}
              className="
              px-5
              py-2
              rounded-full
              bg-red-500
              text-white
              hover:bg-red-600
              transition
              "
            >
              Löschen
            </button>

            <button
              onClick={onClose}
              className="
              px-5
              py-2
              rounded-full
              bg-black
              text-white
              hover:opacity-90
              transition
              "
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryModal;
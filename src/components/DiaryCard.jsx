function DiaryCard({ entry, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      border
      border-gray-100
      cursor-pointer
      transition
      duration-200
      hover:border-gray-300
      "
    >
      <img
        src={entry.imageUrl}
        alt={entry.title}
        className="
        w-full
        h-56
        object-cover
        "
      />

      <div className="p-5">
        <span
          className="
          inline-flex
          px-3
          py-1
          rounded-full
          bg-gray-100
          text-xs
          text-gray-600
          "
        >
          {entry.date}
        </span>

        <h2 className="font-serif text-2xl mt-4">{entry.title}</h2>
      </div>
    </div>
  );
}

export default DiaryCard;

"use client";
export default function SearchBar({setSearchTerm, handleSubmit, searchTerm}) {
  return (
    <>
      {/**  Search Bar */}
      <form
        className="flex flex-row mt-4"
        onSubmit={handleSubmit}
        id="landing-search"
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Explore courses..."
            className="w-64 sm:w-96 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 transition duration-150"
          />
          <svg
            className="absolute right-0 top-0 mt-3 mr-4 text-gray-500 h-4 w-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 12 12"
            stroke="currentColor"
          >
            <path d="M12 4v16"></path>
          </svg>
        </div>
        <button
          type="submit"
          className="ml-4 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-900 transition duration-150"
        >
          {" "}
          Search{" "}
        </button>
      </form>
    </>
  );
}

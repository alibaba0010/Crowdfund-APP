import type React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-[#1dc071] text-white hover:bg-[#18a05e] transition-colors"
        }`}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 rounded-md ${
            currentPage === number
              ? "bg-[#1dc071] text-white"
              : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-[#1dc071] text-white hover:bg-[#18a05e] transition-colors"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

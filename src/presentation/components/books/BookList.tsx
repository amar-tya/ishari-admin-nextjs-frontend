import React from 'react';

// Placeholder type definition suitable for the view
export interface Book {
  id: string;
  displayId: string;
  coverUrl?: string;
  title: string;
  author: string;
  description: string;
  publishedYear: string;
}

interface BookListProps {
  books: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden flex flex-col">
      <div className="min-w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-light bg-bg-main">
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-16">
                ID
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-24">
                Cover Image
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-1/5 min-w-[200px]">
                Title
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-1/6 min-w-[150px]">
                Author
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-1/4 min-w-[250px]">
                Description
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-32 whitespace-nowrap">
                Published Year
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-caption font-semibold text-text-secondary uppercase tracking-wider w-24 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {books.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-text-muted text-body"
                >
                  Tidak ada data yang ditampilkan
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-bg-main transition-colors group"
                >
                  {/* ID */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-description text-text-muted">
                    {book.displayId}
                  </td>

                  {/* Cover Image */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="h-12 w-10 bg-border-light rounded flex items-center justify-center text-text-muted overflow-hidden border border-border">
                      {book.coverUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                    </div>
                  </td>

                  {/* Title */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-subtitle font-semibold text-text-primary">
                      {book.title}
                    </div>
                  </td>

                  {/* Author */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-body text-text-secondary">
                      {book.author}
                    </div>
                  </td>

                  {/* Description */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-description text-text-secondary line-clamp-2 max-w-prose">
                      {book.description}
                    </div>
                  </td>

                  {/* Published Year */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-body text-text-secondary">
                      {book.publishedYear}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-center">
                    <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(book.id)}
                        className="p-1 text-text-secondary hover:text-primary transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(book.id)}
                        className="p-1 text-text-secondary hover:text-error transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from 'react';
import { TranslationEntity } from '@/core/entities';
import { EditIcon, TrashIcon } from '@/presentation/components/base/icons';
import { Badge } from '../base/Badge';

interface TranslationListProps {
  translations: TranslationEntity[];
  onEdit: (translation: TranslationEntity) => void;
  onDelete: (translation: TranslationEntity) => void;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

export const TranslationList: React.FC<TranslationListProps> = ({
  translations = [],
  onEdit,
  onDelete,
  selectedIds,
  onSelectionChange,
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(translations.map((t) => t.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const isAllSelected =
    translations.length > 0 &&
    translations.every((t) => selectedIds.includes(t.id));

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
      <div className="min-w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border-light)] bg-[#F0F4F8]">
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] w-12">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider w-24">
                ID
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider min-w-[200px]">
                Verse
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider min-w-[250px]">
                Translation
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider w-32 text-center">
                Lang
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider min-w-[150px]">
                Translator
              </th>
              <th className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.75rem] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider w-24 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {translations.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-[var(--color-text-muted)] text-[0.875rem]"
                >
                  Tidak ada data yang ditampilkan
                </td>
              </tr>
            ) : (
              translations.map((translation) => (
                <tr
                  key={translation.id}
                  className="hover:bg-[var(--color-bg-main)] transition-colors group"
                >
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                      checked={selectedIds.includes(translation.id)}
                      onChange={() => handleSelectOne(translation.id)}
                    />
                  </td>

                  {/* ID */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-[0.875rem] text-[var(--color-text-muted)] font-medium">
                    #T-{translation.id}
                  </td>

                  {/* Verse */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div
                      className="font-arabic text-[clamp(1rem,1.2vw,1.2rem)] text-[var(--color-text-primary)] text-right leading-relaxed mb-1"
                      dir="rtl"
                    >
                      {translation.verse?.arabicText} ({translation.verseId})
                    </div>
                    {/* <div className="text-[0.75rem] text-[var(--color-text-muted)]">
                      Verse ID: {translation.verseId}
                    </div> */}
                  </td>

                  {/* Translation */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-sm text-[var(--color-text-primary)] line-clamp-3">
                      {translation.translation}
                    </div>
                  </td>

                  {/* Language */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-center">
                    <Badge variant="info" className="uppercase">
                      {translation.languageCode}
                    </Badge>
                  </td>

                  {/* Translator */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)]">
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">
                      {translation.translator}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-[clamp(1rem,1.5vw,1.5rem)] text-center">
                    <div className="flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(translation)}
                        className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <EditIcon size={20} />
                      </button>
                      <button
                        onClick={() => onDelete(translation)}
                        className="p-1 text-[var(--color-text-secondary)] hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <TrashIcon size={20} />
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

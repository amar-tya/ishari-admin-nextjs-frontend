import {
  TranslationRequest,
  TranslationResponse,
  TranslationCreateRequest,
  TranslationUpdateRequest,
} from '@/application/dto';

export interface TranslationViewModelState {
  isLoading: boolean;
  error: string | null;
  translationList: TranslationResponse | null;
}

export interface TranslationViewModelActions {
  findTranslation: (criteria?: Partial<TranslationRequest>) => Promise<void>;
  setCriteria: (criteria: TranslationRequest) => void;
  createTranslation: (data: TranslationCreateRequest) => Promise<boolean>;
  updateTranslation: (data: TranslationUpdateRequest) => Promise<boolean>;
  deleteTranslation: (id: number) => Promise<boolean>;
  bulkDeleteTranslation: (ids: number[]) => Promise<boolean>;
}

export type TranslationViewModel = TranslationViewModelState &
  TranslationViewModelActions;

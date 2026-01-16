/**
 * Layout ViewModel State
 */
export interface LayoutViewModelState {
  isLoggingOut: boolean;
}

/**
 * Layout ViewModel Actions
 */
export interface LayoutViewModelActions {
  handleLogout: () => Promise<void>;
}

/**
 * Layout ViewModel Return Type
 */
export type LayoutViewModel = LayoutViewModelState & LayoutViewModelActions;

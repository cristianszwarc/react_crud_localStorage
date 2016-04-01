export const APP_NAVIGATE = 'APP_NAVIGATE';

export function appNavigate(value) {
  return {
    type: APP_NAVIGATE,
    payload: value
  };

}

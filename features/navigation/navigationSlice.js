import { createAction } from '@reduxjs/toolkit';

export const navigate = createAction('navigation/navigate');
export const nav = (path) => ({
  type: 'nav' + path,
});

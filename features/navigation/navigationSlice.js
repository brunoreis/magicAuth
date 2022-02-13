import { createAction } from '@reduxjs/toolkit';
export const requestNavigation = (path) => ({
  type: 'nav' + path
})
export const redirectsStarted = createAction('authentication/redirectsStarted')
export const redirectsCompleted = createAction('authentication/redirectsCompleted')

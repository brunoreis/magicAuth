import { createAction } from '@reduxjs/toolkit';
export const requestNavigation = (path) => ({
  type: 'nav' + path
})
export const redirectsStarted = createAction('navigation/redirectsStarted')
export const redirectsCompleted = createAction('navigation/redirectsCompleted')

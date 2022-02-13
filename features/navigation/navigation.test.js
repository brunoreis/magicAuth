import { put, call, all, takeEvery } from 'redux-saga/effects'
import Router from 'next/router'
import { startsWithSlashNav } from './navigation';

import { navigation, navigateTo, nav } from './navigation';
  describe('sagas', () => {
    it('redirects actions into sagas', () => {
        const g = navigation();
        expect(g.next().value).toStrictEqual(
            all([
                takeEvery(startsWithSlashNav, nav), 
            ])
        )
        expect(g.next().done).toBe(true);
    })
    
    describe('navigation', () => {
        describe('navigateTo', () => {
            it('Given that navigateTo is called with a path, it should dispatch an action with the dynamic type name of nav[path]', () => {
                const g = navigateTo('/dynamic/path')
                expect(g.next().value).toEqual(put({type: "nav/dynamic/path"}))
                expect(g.next().done).toBe(true);
            })
        })
        describe('nav', () => {
            it('Given an action with the dynamic path is handled, it should ask the router to go to that path.', () => {
                const g = nav({type: 'nav/dynamic/path'})
                expect(g.next().value).toEqual(call([Router, Router.push], '/dynamic/path'))
                expect(g.next().done).toBe(true);
            })
        })
    })
  });
  
import { Magic } from 'magic-sdk';
const magic = new Magic('pk_live_DAD57FAA0FFD246C', {
  testMode: true,
}); // @todo: move this key to Vercel
export default magic;

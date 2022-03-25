import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { preloadMagicLinkIFrame } from '../../slice/authenticationSlice';

const usePreloadMagicLinkIFrameEffect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(preloadMagicLinkIFrame());
  }, []);
};

export default usePreloadMagicLinkIFrameEffect
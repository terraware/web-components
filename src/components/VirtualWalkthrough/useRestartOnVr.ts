import { RefObject, useEffect } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { Script, XRTYPE_VR } from 'playcanvas';

/**
 * Replays a one-shot script effect at the start of every VR session.
 *
 * `GSplatShaderEffect` zeroes its timeline on the script's `enable` event and switches itself off
 * once the animation has played out, so re-enabling a finished effect runs it again. The `enabled`
 * setter only fires the event on a change of state, which is why an effect still mid-play is taken
 * back through disabled first.
 *
 * @param scriptRef - The script instance to replay, as handed back by `Script`'s ref.
 * @param enabled - Whether the effect is in use at all. No session is watched while false.
 */
export const useRestartOnVr = (scriptRef: RefObject<Script | null>, enabled: boolean) => {
  const app = useApp();

  useEffect(() => {
    const xr = app?.xr;
    if (!xr || !enabled) {
      return;
    }

    const restart = () => {
      const script = scriptRef.current;
      if (!script || xr.type !== XRTYPE_VR) {
        return;
      }
      script.enabled = false;
      script.enabled = true;
    };

    xr.on('start', restart);

    return () => {
      xr.off('start', restart);
    };
  }, [app, enabled, scriptRef]);
};

export default useRestartOnVr;

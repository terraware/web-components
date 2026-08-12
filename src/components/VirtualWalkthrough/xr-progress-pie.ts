/**
 * Progress to hand the pie shader, where 0 draws nothing at all: an untouched target wears no faint
 * track, and a completed one has already opened its annotation or ended the session.
 *
 * Visibility rides on this value so the quad can stay enabled for the whole session. A mesh
 * instance compiles its shader variant the first time it is drawn, and that compile has to land
 * somewhere other than the frame a pie first appears.
 */
export const pieShaderProgress = (progress: number): number => (progress > 0 && progress < 1 ? progress : 0);

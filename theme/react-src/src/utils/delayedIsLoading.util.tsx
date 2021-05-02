import { setIsLoading } from '../slices/app/app.slice';

type DelayedIsLoading = (state: boolean, latency: number) => () => void;
/**
 * Dispatches the isLoading state at a given latency
 * @param state boolean for setting isLoading
 * @param latency the latency for dispatching the state
 * @returns void
 */
export const delayedIsLoading: DelayedIsLoading = (state, latency) => {
  const timer = setTimeout(() => setIsLoading(state), latency);
  return () => clearTimeout(timer);
};

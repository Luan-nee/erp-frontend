import type { PropColor } from './PropColor';
import type { PropCategoria, PropResumenCategoria } from './categoria';

export type PropResponse = {
  status: number;
  message: string;
  info: PropColor[] | PropCategoria[] | PropResumenCategoria;
};

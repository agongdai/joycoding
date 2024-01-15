import { StyleVariant } from '@myex/types/common';

import colors from './colors';

export const VariantColorMap: Record<StyleVariant, string> = {
  [StyleVariant.Primary]: colors.primaryMain,
  [StyleVariant.Success]: colors.successMain,
  [StyleVariant.Info]: colors.infoMain,
  [StyleVariant.Error]: colors.errorMain,
  [StyleVariant.Danger]: colors.errorMain,
  [StyleVariant.Secondary]: colors.secondaryMain,
  [StyleVariant.Warning]: colors.warningMain,
  [StyleVariant.Highlight]: colors.highlightMain,
  [StyleVariant.Default]: '',
};

export const variant2Color = (variant: StyleVariant) => VariantColorMap[variant] || '';

export default colors;

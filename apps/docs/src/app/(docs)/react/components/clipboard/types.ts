import { Clipboard } from '@mmdev98/base-ui-plus/clipboard';
import { createMultipleTypes } from 'docs/src/utils/createTypes';

const { types, AdditionalTypes } = createMultipleTypes(import.meta.url, Clipboard);

export const TypesClipboard = types;
export const TypesClipboardAdditional = AdditionalTypes;

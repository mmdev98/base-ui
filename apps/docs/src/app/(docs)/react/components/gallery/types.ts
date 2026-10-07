import { Gallery } from '@mmdev98/base-ui-plus/gallery';
import { createMultipleTypes } from 'docs/src/utils/createTypes';

const { types, AdditionalTypes } = createMultipleTypes(import.meta.url, Gallery);

export const TypesGallery = types;
export const TypesGalleryAdditional = AdditionalTypes;

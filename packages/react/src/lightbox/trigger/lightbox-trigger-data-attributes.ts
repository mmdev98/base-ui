/**
 * Present while its image loads before the viewer opens.
 */
export const pending = "data-pending";

/**
 * Present while its image flies to or from the viewer. Hide the trigger meanwhile.
 */
export const flying = "data-flying";

/**
 * Present while another trigger's image loads.
 */
export const disabled = "data-disabled";

/**
 * Present while the viewer shows its image, from the start of the opening
 * flight to the end of the closing one. Hide the thumbnail meanwhile and keep
 * its space (`visibility: hidden`), like a phone's photo app.
 */
export const popupOpen = "data-popup-open";

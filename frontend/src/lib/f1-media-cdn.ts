const F1_MEDIA_CDN = 'https://media.formula1.com/image/upload'

/** Build a formula1.com media CDN URL for a DAM asset path. */
export function f1MediaUrl(assetPath: string, height = 320): string {
  return `${F1_MEDIA_CDN}/e_trim/c_fit,h_${height}/q_auto/v1740000001/${assetPath}`
}

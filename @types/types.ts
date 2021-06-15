export type Empty = ''

export type UploadStatus = 'uploading' | 'uploaded' | 'error'

export type ImageUploadData = {
  uploadStatus?: UploadStatus
  key: string
  file: string | Blob
  url: string
}

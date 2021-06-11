import React from 'react'

export const ACCEPT_TYPE = ['image/x-png', 'image/jpeg', 'image/png']

export const preventAll = (
  e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
) => {
  e.preventDefault()
  e.stopPropagation()
}

export const getDropData = async (
  ev: React.DragEvent<HTMLInputElement>,
  single: boolean = false,
) => {
  const dataTransfer = ev.dataTransfer?.items
  if (!dataTransfer) {
    return []
  }
  const length = single ? 1 : dataTransfer.length
  const ret = []
  for (let i = 0; i < length; i += 1) {
    const file = dataTransfer[i]
    if (!ACCEPT_TYPE.includes(file.type)) {
      console.error(`Type ${file.type} not supported`)
      continue
    }
    if (file.kind === 'file') {
      ret.push(URL.createObjectURL(file.getAsFile()))
    }
  }
  return ret
}

export const getUploadData = async (
  ev: React.ChangeEvent<HTMLInputElement>,
  single: boolean = false,
) => {
  const files = ev.target.files
  if (!files) {
    return []
  }
  const length = single ? 1 : files.length
  const ret = []
  for (let i = 0; i < length; i += 1) {
    ret.push(URL.createObjectURL(files[i]))
  }
  return ret
}

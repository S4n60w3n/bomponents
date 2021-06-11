export type Crop = {
  x: number
  y: number
  width: number
  height: number
}

export const MIN_ZOOM = 0.6
export const MAX_ZOOM = 3

export const ROTATE_ANGLE = 90

export const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180
}

export const getImageData = (
  image: HTMLImageElement,
  crop: Crop,
  rotation: number,
  maxWidth?: number,
  maxHeight?: number,
): Promise<Blob | null> => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const { x = 0, y = 0, width = 0, height = 0 } = crop
  const imageWidth = image.naturalWidth
  const imageHeight = image.naturalHeight
  const cropWidth = width * scaleX
  const cropHeight = height * scaleY
  const cropX = x * scaleX
  const cropY = y * scaleY
  const finalWidth = Math.min(cropWidth, maxWidth || cropWidth)
  const finalHeight = Math.min(cropHeight, maxHeight || cropHeight)
  const finalWScale = finalWidth / (cropWidth / 100) / 100
  const finalHScale = finalHeight / (cropHeight / 100) / 100
  canvas.style['backgroundColor'] = 'white'
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const maxSize = Math.max(imageWidth, imageHeight)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)
  ctx.drawImage(
    image,
    safeArea / 2 - imageWidth * 0.5,
    safeArea / 2 - imageHeight * 0.5,
    imageWidth,
    imageHeight,
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = cropWidth
  canvas.height = cropHeight

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + imageWidth * 0.5 - cropX),
    Math.round(0 - safeArea / 2 + imageHeight * 0.5 - cropY),
  )

  ctx.scale(finalWScale, finalHScale)

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      'image/jpeg',
      1,
    )
  })
}

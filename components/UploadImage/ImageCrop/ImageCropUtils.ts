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
  initialCrop: Crop,
  rotation: number,
  maxWidth?: number,
  maxHeight?: number,
): Promise<Blob | null> => {
  const canvas = document.createElement('canvas')
  const { x = 0, y = 0, width = 0, height = 0 } = crop
  const imageWidth = image.naturalWidth
  const imageHeight = image.naturalHeight
  const finalWidth = Math.min(width, maxWidth || width)
  const finalHeight = Math.min(height, maxHeight || height)
  const finalWScale = finalWidth / (width / 100) / 100
  const finalHScale = finalHeight / (height / 100) / 100
  canvas.style['backgroundColor'] = 'white'
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const maxSize = Math.max(imageWidth, imageHeight, width, height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  ctx.filter = 'blur(200px)'
  ctx.drawImage(
    image,
    initialCrop.x,
    initialCrop.y,
    initialCrop.width,
    initialCrop.height,
    0,
    0,
    safeArea,
    safeArea,
  )

  ctx.filter = 'none'

  ctx.drawImage(
    image,
    safeArea / 2 - imageWidth * 0.5,
    safeArea / 2 - imageHeight * 0.5,
    imageWidth,
    imageHeight,
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = width
  canvas.height = height

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + imageWidth * 0.5 - x),
    Math.round(0 - safeArea / 2 + imageHeight * 0.5 - y),
  )

  if (finalWScale !== 1 || finalHScale !== 1) {
    ctx.scale(finalWScale, finalHScale)
  }

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

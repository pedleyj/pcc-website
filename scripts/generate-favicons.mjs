import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const SOURCE = join(import.meta.dirname, '..', 'public', 'images', 'pcc-logo-black.png')
const OUT = join(import.meta.dirname, '..', 'public')

async function generate() {
  console.log('Generating favicons from', SOURCE)

  // apple-touch-icon.png (180x180)
  await sharp(SOURCE)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(OUT, 'apple-touch-icon.png'))
  console.log('  apple-touch-icon.png (180x180)')

  // icon-192.png
  await sharp(SOURCE)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(OUT, 'icon-192.png'))
  console.log('  icon-192.png (192x192)')

  // icon-512.png
  await sharp(SOURCE)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(OUT, 'icon-512.png'))
  console.log('  icon-512.png (512x512)')

  // favicon.ico — build ICO from 16x16 and 32x32 PNGs
  const png16 = await sharp(SOURCE)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer()

  const png32 = await sharp(SOURCE)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer()

  // Build a multi-size ICO file manually
  const icoBuffer = buildIco([png16, png32])
  writeFileSync(join(OUT, 'favicon.ico'), icoBuffer)
  console.log('  favicon.ico (16x16 + 32x32)')

  console.log('Done!')
}

// Minimal ICO file builder from PNG buffers
function buildIco(pngBuffers) {
  const numImages = pngBuffers.length
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * numImages
  const dataOffset = headerSize + dirSize

  // Calculate total size
  let totalSize = dataOffset
  for (const buf of pngBuffers) totalSize += buf.length

  const ico = Buffer.alloc(totalSize)

  // ICO header
  ico.writeUInt16LE(0, 0)      // reserved
  ico.writeUInt16LE(1, 2)      // type: 1 = ICO
  ico.writeUInt16LE(numImages, 4) // number of images

  let currentOffset = dataOffset
  const sizes = [16, 32]

  for (let i = 0; i < numImages; i++) {
    const buf = pngBuffers[i]
    const size = sizes[i]
    const entryOffset = headerSize + i * dirEntrySize

    ico.writeUInt8(size === 256 ? 0 : size, entryOffset)      // width
    ico.writeUInt8(size === 256 ? 0 : size, entryOffset + 1)  // height
    ico.writeUInt8(0, entryOffset + 2)   // color palette
    ico.writeUInt8(0, entryOffset + 3)   // reserved
    ico.writeUInt16LE(1, entryOffset + 4)  // color planes
    ico.writeUInt16LE(32, entryOffset + 6) // bits per pixel
    ico.writeUInt32LE(buf.length, entryOffset + 8)   // image size
    ico.writeUInt32LE(currentOffset, entryOffset + 12) // image offset

    buf.copy(ico, currentOffset)
    currentOffset += buf.length
  }

  return ico
}

generate().catch(console.error)

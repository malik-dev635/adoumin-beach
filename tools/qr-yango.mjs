import QRCode from 'qrcode'
import fs from 'node:fs'
/** QR code du lien Yango, en SVG statique (genere une fois, aucune lib cote client). */
const url = 'https://yango.go.link/route?end-lat=5.3215193&end-lon=-4.0018253&ref=malik-dev&lang=fr&adj_deeplink_js=1'
const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 1, color: { dark: '#1C3464', light: '#FFFFFF' } })
fs.writeFileSync('public/asset/yango-qr.svg', svg)
console.log('ok', svg.length, 'octets')

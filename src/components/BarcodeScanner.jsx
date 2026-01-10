import React, { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { X } from 'lucide-react'

const BarcodeScanner = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    let html5QrCode = null

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode('barcode-reader')

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        }

        await html5QrCode.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            // Successfully scanned
            html5QrCode.stop().then(() => {
              onScanSuccess(decodedText)
            }).catch(err => console.error('Error stopping scanner:', err))
          },
          (errorMessage) => {
            // Scanning failed - ignore this, it happens continuously
          }
        )

        setIsScanning(true)
      } catch (err) {
        console.error('Error starting scanner:', err)
        alert('Unable to access camera. Please check permissions.')
        onClose()
      }
    }

    startScanner()

    return () => {
      if (html5QrCode && isScanning) {
        html5QrCode.stop().catch(err => console.error('Error stopping scanner:', err))
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Scan Barcode</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scanner */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div id="barcode-reader" className="rounded-lg overflow-hidden"></div>
          <p className="text-white text-center mt-4 text-sm">
            Position the barcode within the frame to scan
          </p>
        </div>
      </div>
    </div>
  )
}

export default BarcodeScanner

import React, { useEffect, useRef, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { X } from 'lucide-react'

const BarcodeScanner = ({ onScanSuccess, onClose }) => {
  const html5QrCodeRef = useRef(null)
  const isScanningRef = useRef(false)

  const stopScanner = useCallback(async () => {
    if (html5QrCodeRef.current && isScanningRef.current) {
      try {
        await html5QrCodeRef.current.stop()
        isScanningRef.current = false
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
  }, [])

  useEffect(() => {
    const startScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode('barcode-reader')

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        }

        await html5QrCodeRef.current.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            // Successfully scanned
            stopScanner().then(() => {
              onScanSuccess(decodedText)
            })
          },
          () => {
            // Scanning failed - ignore this, it happens continuously
          }
        )

        isScanningRef.current = true
      } catch (err) {
        console.error('Error starting scanner:', err)
        alert('Unable to access camera. Please check permissions.')
        onClose()
      }
    }

    startScanner()

    return () => {
      stopScanner()
    }
  }, [onScanSuccess, onClose, stopScanner])

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

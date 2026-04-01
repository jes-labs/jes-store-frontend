'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'


interface ProductImageUploadProps {
  value?: string
  onChange: (url: string) => void
  className?: string
}

export function ProductImageUpload({ value, onChange, className }: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      })
      if (!res.ok) {
        const body = await res.text()
        throw new Error(`Pinata error ${res.status}: ${body}`)
      }
      const data = await res.json()
      const cid = data.IpfsHash
      if (!cid) throw new Error('No CID returned from Pinata')
      const url = `https://ipfs.io/ipfs/${cid}`
      setPreview(url)
      onChange(url)
    } catch (err) {
      console.error(err)
      toast.error('Image upload failed. Please try again.')
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPreview(null)
    onChange('')
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Product Image</h3>
        {preview && !isUploading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={removeImage}
            className="h-auto p-0 text-destructive text-[10px] font-bold uppercase tracking-widest hover:bg-transparent"
          >
            Remove
          </Button>
        )}
      </div>

      <div
        className={cn(
          'relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden group',
          preview ? 'border-transparent' : 'border-border/50 hover:border-primary/50 bg-muted/20',
          isUploading && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={isUploading}
        />

        {preview ? (
          <div className="absolute inset-0">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Uploading to IPFS…</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs font-bold uppercase tracking-widest">Change Image</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Uploading to IPFS…</p>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-bold mb-1">Upload Product Image</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider px-4">
                  Drag and drop or click to browse
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {!preview && !isUploading && (
        <p className="text-[9px] text-muted-foreground italic px-2">
          Recommended: square JPG, PNG or WebP, max 5MB. Stored permanently on IPFS via Pinata.
        </p>
      )}
    </div>
  )
}

'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        return { success: false, message: 'No file uploaded' }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '') // Sanitize
    const finalFilename = `${uniqueSuffix}-${filename}`

    // Save to public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, finalFilename)

    try {
        await writeFile(filepath, buffer)
        const url = `/uploads/${finalFilename}` // Adjust path if using basePath or simple /uploads
        // Since we are not using basePath yet in next.config.js (commented out), we use /uploads directly relative to public? 
        // Wait, next.js serves public folder at root. So it should be /uploads/...
        // But if we deploy to a subpath later, this might break. For now, /uploads is fine.
        // Actually, user wants /newsletter prefix potentially? No, public files are root.
        // Let's stick to /uploads/filename.

        return { success: true, url: `/uploads/${finalFilename}` }
    } catch (error) {
        console.error('Upload error:', error)
        return { success: false, message: 'Upload failed' }
    }
}

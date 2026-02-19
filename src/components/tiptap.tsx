'use client'

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { Button } from './ui/button'
import {
    Bold, Italic, List, ListOrdered,
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
    Quote, Image as ImageIcon, Link as LinkIcon, Code as CodeIcon
} from 'lucide-react'
import { useEffect, useCallback } from 'react'
import { uploadFile } from '@/actions/upload'
import { FileAttachment } from './extensions/file-attachment'
import { CodeBlock } from './extensions/code-block'

const lowlight = createLowlight(common)

interface TiptapProps {
    content: string
    onChange: (html: string) => void
}

export default function Tiptap({ content, onChange }: TiptapProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6]
                },
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }).extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlock)
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            FileAttachment,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4 border rounded-md bg-background max-w-none'
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // Sync content if it changes externally
    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            if (editor.isEmpty) {
                editor.commands.setContent(content)
            }
        }
    }, [content, editor])

    const addImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0]
                const formData = new FormData()
                formData.append('file', file)

                const result = await uploadFile(formData)
                if (result.success && result.url && editor) {
                    editor.chain().focus().setImage({ src: result.url }).run()
                }
            }
        }
        input.click()
    }, [editor])

    const addFile = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0]
                const formData = new FormData()
                formData.append('file', file)

                const result = await uploadFile(formData)
                if (result.success && result.url && editor) {
                    // Insert custom file attachment node
                    editor.chain().focus().insertContent({
                        type: 'fileAttachment',
                        attrs: {
                            src: result.url,
                            fileName: file.name
                        }
                    }).run()
                }
            }
        }
        input.click()
    }, [editor])


    if (!editor) {
        return null
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 border p-2 rounded-md bg-muted/40 sticky top-0 z-10">
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 1 }) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 2 }) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('heading', { level: 3 }) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    type="button"
                    variant={editor.isActive('bold') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('italic') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    type="button"
                    variant={editor.isActive('bulletList') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('orderedList') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    title="Subir Imagen"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addFile}
                    title="Subir Archivo (Enlace)"
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

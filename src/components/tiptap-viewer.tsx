'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { FileAttachment } from './extensions/file-attachment'
import { useEffect } from 'react'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { CodeBlock } from './extensions/code-block'

const lowlight = createLowlight(common)

interface TiptapViewerProps {
    content: string
}

export default function TiptapViewer({ content }: TiptapViewerProps) {
    const editor = useEditor({
        editable: false,
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
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
            FileAttachment,
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-neutral dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-lg'
            }
        },
    })

    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    if (!editor) {
        return null
    }

    return <EditorContent editor={editor} />
}

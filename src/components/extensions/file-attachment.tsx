import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { FileText, X, Download } from 'lucide-react'

export const FileAttachment = Node.create({
    name: 'fileAttachment',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            fileName: {
                default: 'Archivo adjunto',
            },
            fileSize: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'file-attachment',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['file-attachment', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(({ node, deleteNode, editor }) => {
            const src = node.attrs.src
            const fileName = node.attrs.fileName
            const isEditable = editor.isEditable

            // If not editable (public view), entire card is a link
            const Wrapper = isEditable ? 'div' : 'a'
            const wrapperProps = isEditable ? {} : { href: src, target: '_blank', rel: 'noopener noreferrer' }

            return (
                <NodeViewWrapper className="file-attachment my-6 not-prose">
                    <Wrapper
                        {...wrapperProps}
                        className={`flex items-center gap-4 p-4 border rounded-lg bg-card shadow-sm transition-all max-w-md group relative
                        ${!isEditable ? 'hover:shadow-md hover:border-primary/50 cursor-pointer' : ''}`}
                    >
                        <div className={`p-3 rounded-md transition-colors ${!isEditable ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            <FileText className={`h-6 w-6 ${!isEditable ? 'group-hover:hidden' : ''}`} />
                            {!isEditable && <Download className="h-6 w-6 hidden group-hover:block animate-in fade-in zoom-in duration-200" />}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col">
                            <span className={`text-sm font-semibold truncate transition-colors ${!isEditable ? 'text-foreground group-hover:text-primary' : ''}`}>
                                {fileName}
                            </span>
                            {!isEditable && (
                                <span className="text-xs text-muted-foreground mt-1">
                                    Click para descargar
                                </span>
                            )}
                        </div>

                        {isEditable && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    deleteNode()
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 hover:text-destructive rounded-full absolute right-2 top-1/2 -translate-y-1/2"
                                title="Eliminar archivo"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </Wrapper>
                </NodeViewWrapper>
            )
        })
    },
})

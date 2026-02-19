import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import React from 'react'

export const CodeBlock = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: NodeViewProps) => {
    return (
        <NodeViewWrapper className="code-block relative group my-6 rounded-lg overflow-hidden border border-border bg-zinc-950 text-white">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <select
                    contentEditable={false}
                    defaultValue={defaultLanguage}
                    onChange={event => updateAttributes({ language: event.target.value })}
                    className="bg-transparent text-xs text-muted-foreground outline-none border-none hover:text-white transition-colors cursor-pointer appearance-none text-right font-mono"
                >
                    <option value="null">auto</option>
                    <option disabled>—</option>
                    {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
                        <option key={index} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
            <pre className="p-4 m-0 overflow-x-auto font-mono text-sm leading-relaxed">
                <NodeViewContent />
            </pre>
        </NodeViewWrapper>
    )
}

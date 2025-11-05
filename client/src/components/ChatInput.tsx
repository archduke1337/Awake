import { useState, useRef, KeyboardEvent } from "react";
import { Send, Sparkles, Paperclip, X, Image as ImageIcon, Loader, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { MediaAttachment } from "./MediaRenderer";

interface ChatInputProps {
  onSend: (message: string, attachments?: MediaAttachment[]) => void;
  onWebSearch?: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isSearching?: boolean;
  webSearchEnabled?: boolean;
  onWebSearchToggle?: (enabled: boolean) => void;
}

export default function ChatInput({ onSend, onWebSearch, disabled = false, isSearching = false, placeholder = "Type your message... (Shift+Enter for new line)", webSearchEnabled = false, onWebSearchToggle }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [attachments, setAttachments] = useState<MediaAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSearchTip, setShowSearchTip] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleSend = () => {
    if ((input.trim() || attachments.length > 0) && !disabled) {
      onSend(input.trim(), attachments.length > 0 ? attachments : undefined);
      setInput("");
      setAttachments([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleWebSearch = () => {
    if (input.trim() && onWebSearch && !disabled && !isSearching) {
      onWebSearch(input.trim());
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    await processFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFiles = async (files: File[]) => {
    setIsUploading(true);
    try {
      for (const file of files) {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          const sizeMB = (file.size / 1024 / 1024).toFixed(2);
          alert(`File "${file.name}" is too large (${sizeMB}MB). Maximum size is 5MB.`);
          continue;
        }

        // Validate file type
        if (!ACCEPTED_FORMATS.includes(file.type)) {
          alert(`File type not supported. Supported formats: ${ACCEPTED_FORMATS.map(t => t.split("/")[1]).join(", ")}`);
          continue;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onerror = () => {
          alert(`Failed to read file "${file.name}". Please try again.`);
        };
        reader.onload = (event) => {
          if (event.target?.result) {
            setAttachments(prev => [...prev, {
              type: "image",
              url: event.target?.result as string,
              name: file.name,
              size: file.size,
              mimeType: file.type
            }]);
          }
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const hasInput = input.trim().length > 0 || attachments.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-border/50 dark:border-border/40 bg-gradient-to-t from-background via-background/95 to-transparent dark:via-background/95 p-4"
    >
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Attachments Display */}
        <AnimatePresence>
          {attachments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {attachments.map((attachment, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative group"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-primary/30 hover:border-primary/50 transition-all">
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeAttachment(index)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-all shadow-lg"
                    >
                      <X className="h-3 w-3 text-white" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Input */}
        <div className="flex gap-3 items-end">
          {/* Input Container */}
          <motion.div
            whileFocus={{ scale: 1.01 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`flex-1 rounded-2xl border-2 transition-all duration-300 ${
              isFocused
                ? "border-primary/50 dark:border-primary/60 bg-card shadow-lg shadow-primary/10 dark:shadow-primary/20"
                : "border-border/30 dark:border-border/40 bg-card hover:border-primary/30 dark:hover:border-primary/40"
            }`}
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="min-h-[56px] max-h-[200px] resize-none bg-transparent border-0 focus-visible:ring-0 px-4 py-3 text-base leading-relaxed placeholder-muted-foreground/60 dark:placeholder-muted-foreground/50"
              disabled={disabled || isUploading}
              data-testid="input-message"
              rows={1}
            />
          </motion.div>

          {/* File Attachment Button - Premium */}
          <motion.div
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              size="icon"
              variant="outline"
              className={`
                h-[56px]
                w-[56px]
                shrink-0
                rounded-full
                transition-all
                border-2
                ${
                  isUploading
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-indigo"
                    : "border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:shadow-indigo"
                }
              `}
              title="Attach image"
              data-testid="button-attach"
            >
              {isUploading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <Loader className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
              ) : (
                <Paperclip className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </Button>
          </motion.div>

          {/* Web Search Button - Premium */}
          <motion.div
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={() => onWebSearchToggle?.(!webSearchEnabled)}
              disabled={disabled}
              size="icon"
              variant="outline"
              className={`
                h-[56px]
                w-[56px]
                shrink-0
                rounded-full
                transition-all
                border-2
                ${
                  webSearchEnabled
                    ? "border-teal-500/80 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 hover:border-teal-500/90 hover:shadow-teal"
                    : "border-teal-500/30 hover:border-teal-500/60 hover:bg-teal-500/10 hover:shadow-depth-2"
                }
                ${disabled ? "opacity-50" : ""}
              `}
              title={webSearchEnabled ? "Web search enabled" : "Enable web search"}
              data-testid="button-search"
            >
              {isSearching ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <Loader className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </motion.div>
              ) : (
                <Search className={`
                  h-5
                  w-5
                  transition-all
                  ${webSearchEnabled 
                    ? "text-teal-700 dark:text-teal-300" 
                    : "text-teal-600 dark:text-teal-400"
                  }
                `} />
              )}
            </Button>
          </motion.div>

          {/* Send Button - Premium with Multiple Gradients */}
          <motion.div
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            <Button
              onClick={handleSend}
              disabled={!hasInput || disabled || isUploading}
              size="icon"
              className={`
                h-[56px]
                w-[56px]
                shrink-0
                rounded-full
                transition-all
                relative
                overflow-hidden
                font-semibold
                ${
                  hasInput && !disabled
                    ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:shadow-depth-4 hover:shadow-indigo dark:hover:shadow-indigo/60 text-white"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                }
              `}
              data-testid="button-send"
            >
              {/* Shine effect */}
              {hasInput && !disabled && (
                <div className="
                  absolute
                  inset-0
                  opacity-0
                  hover:opacity-100
                  transition-opacity
                  duration-300
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  pointer-events-none
                " />
              )}
              
              <motion.div
                className="relative z-10"
                animate={disabled ? { rotate: 0 } : {}}
                whileHover={hasInput && !disabled ? { rotate: 360, scale: 1.1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Send className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="px-4 text-xs text-muted-foreground/60 dark:text-muted-foreground/50 flex items-center gap-2"
        >
          <Sparkles className="h-3 w-3" />
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="ml-auto">•</span>
          <Search className="h-3 w-3 text-blue-500" />
          <span>Click search icon for web results</span>
          <span>•</span>
          <span>Drag & drop images or click</span>
          <ImageIcon className="h-3 w-3" />
        </motion.div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_FORMATS.join(",")}
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-file"
      />
    </motion.div>
  );
}

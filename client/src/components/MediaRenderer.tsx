import { useState } from "react";
import { Download, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface MediaAttachment {
  type: "image" | "video" | "audio" | "document";
  url: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

interface MediaRendererProps {
  media: MediaAttachment;
  onDelete?: () => void;
}

export default function MediaRenderer({ media, onDelete }: MediaRendererProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return "🖼️";
      case "video":
        return "📹";
      case "audio":
        return "🔊";
      case "document":
        return "📄";
      default:
        return "📎";
    }
  };

  if (media.type === "image") {
    return (
      <>
        {/* Image Preview in Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative group rounded-xl overflow-hidden border border-primary/20 dark:border-primary/30 hover:border-primary/40 dark:hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/30 cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 animate-pulse" />
          )}

          <img
            src={media.url}
            alt={media.name || "Attachment"}
            className="max-w-md w-full h-auto object-cover"
            onLoad={() => setIsLoading(false)}
          />

          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 dark:bg-black/50 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              <ZoomIn className="h-6 w-6 text-white" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={media.url}
              download={media.name}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-6 w-6 text-white" />
            </motion.a>
          </motion.div>

          {/* File Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg">{getMediaIcon(media.type)}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{media.name || "Image"}</p>
                  {media.size && (
                    <p className="text-xs text-white/70">{formatFileSize(media.size)}</p>
                  )}
                </div>
              </div>
              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="p-1.5 rounded-full bg-red-500/80 hover:bg-red-600 transition-all flex-shrink-0"
                >
                  <X className="h-4 w-4 text-white" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 dark:bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsExpanded(false)}
            >
              {/* Content Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative max-w-4xl w-full h-auto max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-4 mb-4 px-4"
                >
                  <div className="flex items-center gap-3 min-w-0 text-white">
                    <span className="text-2xl">{getMediaIcon(media.type)}</span>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{media.name || "Image"}</p>
                      {media.size && (
                        <p className="text-sm text-white/70">{formatFileSize(media.size)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={media.url}
                      download={media.name}
                      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      title="Download"
                    >
                      <Download className="h-5 w-5 text-white" />
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsExpanded(false)}
                      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      title="Close (ESC)"
                    >
                      <X className="h-5 w-5 text-white" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 flex items-center justify-center overflow-hidden rounded-xl"
                >
                  <img
                    src={media.url}
                    alt={media.name || "Attachment"}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm"
              >
                Click outside or press ESC to close
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Placeholder for other media types
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-primary/20 dark:border-primary/30 hover:border-primary/40"
    >
      <span className="text-2xl">{getMediaIcon(media.type)}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{media.name || "File"}</p>
        {media.size && (
          <p className="text-xs text-muted-foreground">{formatFileSize(media.size)}</p>
        )}
      </div>
      {onDelete && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDelete}
          className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all"
        >
          <X className="h-4 w-4 text-red-500" />
        </motion.button>
      )}
    </motion.div>
  );
}

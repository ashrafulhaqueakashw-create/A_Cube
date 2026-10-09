import React, { useCallback, useState, useRef } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  existingFileUrl?: string;
  existingFileName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '*/*',
  maxSizeMB = 10,
  className,
  existingFileUrl,
  existingFileName
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    setError(null);
    
    // Check size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const displayFile = selectedFile || existingFileName;

  return (
    <div className={cn("w-full", className)}>
      {!displayFile ? (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
          <p className="mb-2 text-sm font-semibold">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum file size: {maxSizeMB}MB
          </p>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-md border p-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="rounded p-2 bg-primary/10 text-primary">
              <File className="h-6 w-6" />
            </div>
            <div className="truncate">
              <p className="truncate text-sm font-medium">
                {selectedFile ? selectedFile.name : existingFileName}
              </p>
              {selectedFile && (
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export { FileUpload };
export default FileUpload;

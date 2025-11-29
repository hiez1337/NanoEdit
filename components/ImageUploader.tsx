import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ImageUploaderProps {
  onImageSelected: (image: UploadedImage) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Extract base64 content without the data URL prefix for the API
      const base64 = result.split(',')[1];
      
      onImageSelected({
        file,
        previewUrl: result,
        base64,
        mimeType: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out p-12 text-center
          ${isDragging 
            ? 'border-primary-500 bg-primary-500/10 scale-[1.02]' 
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onInputChange}
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full bg-slate-700 transition-transform duration-300 group-hover:scale-110 ${isDragging ? 'bg-primary-600' : ''}`}>
            <Upload className="w-8 h-8 text-slate-200" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('upload.title')}</h3>
            <p className="text-slate-400">{t('upload.subtitle')}</p>
          </div>
          <div className="flex gap-4 mt-4">
             <div className="flex items-center text-xs text-slate-500">
                <ImageIcon className="w-4 h-4 mr-1" />
                {t('upload.supports')}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;

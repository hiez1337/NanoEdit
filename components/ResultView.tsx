import React, { useState } from 'react';
import { ArrowLeft, Download, Maximize2, Split } from 'lucide-react';
import Button from './Button';
import { UploadedImage } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ResultViewProps {
  originalImage: UploadedImage;
  editedImageUrl: string;
  textResponse: string | null;
  onReset: () => void;
  onDownload: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ 
  originalImage, 
  editedImageUrl, 
  textResponse,
  onReset, 
  onDownload 
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'toggle'>('side-by-side');
  const [showOriginal, setShowOriginal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Button variant="ghost" onClick={onReset} icon={<ArrowLeft className="w-4 h-4" />}>
          {t('result.editAnother')}
        </Button>
        
        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'side-by-side' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Split className="w-4 h-4 inline-block mr-2" />
            {t('result.sideBySide')}
          </button>
          <button
            onClick={() => setViewMode('toggle')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'toggle' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Maximize2 className="w-4 h-4 inline-block mr-2" />
            {t('result.toggleView')}
          </button>
        </div>

        <Button variant="primary" onClick={onDownload} icon={<Download className="w-4 h-4" />}>
          {t('result.download')}
        </Button>
      </div>

      {/* Image Display */}
      <div className="bg-slate-800/50 rounded-2xl p-4 sm:p-8 border border-slate-700/50 backdrop-blur-sm">
        
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t('result.original')}</span>
              <div className="relative aspect-auto rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-xl">
                <img 
                  src={originalImage.previewUrl} 
                  alt="Original" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">{t('result.edited')}</span>
              <div className="relative aspect-auto rounded-xl overflow-hidden bg-slate-900 border border-primary-500/30 shadow-xl shadow-primary-900/20">
                <img 
                  src={editedImageUrl} 
                  alt="Edited" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-3xl mx-auto">
            <div 
              className="relative aspect-auto rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl cursor-pointer group"
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
              onTouchStart={() => setShowOriginal(true)}
              onTouchEnd={() => setShowOriginal(false)}
            >
              <img 
                src={showOriginal ? originalImage.previewUrl : editedImageUrl} 
                alt="Display" 
                className="w-full h-full object-contain transition-opacity duration-200"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
                {showOriginal ? t('result.viewOriginal') : t('result.viewEdited')}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-4 py-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {t('result.holdLabel')}
              </div>
            </div>
          </div>
        )}

        {/* Text Feedback if present */}
        {textResponse && (
           <div className="mt-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
             <h4 className="text-sm font-medium text-slate-300 mb-2">{t('result.modelFeedback')}</h4>
             <p className="text-slate-100 italic">"{textResponse}"</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default ResultView;

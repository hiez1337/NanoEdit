import React, { useState } from 'react';
import { UploadedImage, AppState } from './types';
import { editImageWithGemini } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import ResultView from './components/ResultView';
import Button from './components/Button';
import { Sparkles, Wand2, Trash2, Github, AlertCircle, Globe } from 'lucide-react';
import { useTranslation } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentImage, setCurrentImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [textResponse, setTextResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { language, setLanguage, t } = useTranslation();

  const handleImageSelected = (image: UploadedImage) => {
    setCurrentImage(image);
    setAppState(AppState.EDITING);
    setError(null);
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setCurrentImage(null);
    setPrompt('');
    setEditedImageUrl(null);
    setTextResponse(null);
    setError(null);
  };

  const handleEdit = async () => {
    if (!currentImage || !prompt.trim()) return;

    setAppState(AppState.PROCESSING);
    setError(null);

    try {
      const result = await editImageWithGemini(currentImage, prompt);
      
      if (result.imageUrl) {
        setEditedImageUrl(result.imageUrl);
      }
      if (result.text) {
        setTextResponse(result.text);
      }

      if (!result.imageUrl && !result.text) {
        throw new Error(t('error.noResult'));
      }

      setAppState(AppState.RESULT);
    } catch (err: any) {
      console.error(err);
      setError(err.message || t('error.generic'));
      setAppState(AppState.EDITING);
    }
  };

  const handleDownload = () => {
    if (editedImageUrl) {
      const link = document.createElement('a');
      link.href = editedImageUrl;
      link.download = `nano-edit-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-primary-500/30">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-gradient-to-tr from-primary-600 to-indigo-600 p-2 rounded-lg">
               <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {t('app.title')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700/50">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  language === 'en' 
                    ? 'bg-slate-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                EN
              </button>
              <div className="w-[1px] h-4 bg-slate-700 mx-1"></div>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  language === 'ru' 
                    ? 'bg-slate-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                RU
              </button>
            </div>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
               <Github className="w-5 h-5" />
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/20 rounded-full blur-[128px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[128px]" />
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-start gap-3 max-w-2xl w-full animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {appState === AppState.IDLE && (
          <div className="w-full flex flex-col items-center gap-8 animate-fade-in-up">
            <div className="text-center space-y-4 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {t('hero.title')} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">{t('hero.highlight')}</span>
              </h2>
              <p className="text-lg text-slate-400">
                {t('hero.subtitle')}
              </p>
            </div>
            <ImageUploader onImageSelected={handleImageSelected} />
            
            <div className="flex gap-4 text-sm text-slate-500 mt-8 flex-wrap justify-center">
              <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">{t('tags.retro')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">{t('tags.sketch')}</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">{t('tags.removeText')}</span>
            </div>
          </div>
        )}

        {(appState === AppState.EDITING || appState === AppState.PROCESSING) && currentImage && (
          <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
            {/* Image Preview */}
            <div className="flex-1 flex flex-col gap-4">
               <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl aspect-auto max-h-[70vh]">
                 <img 
                   src={currentImage.previewUrl} 
                   alt="Preview" 
                   className="w-full h-full object-contain mx-auto"
                 />
                 <button 
                    onClick={handleReset}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600/80 backdrop-blur rounded-full text-white transition-colors opacity-0 group-hover:opacity-100"
                    title={t('controls.removeImage')}
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-96 flex flex-col gap-6">
               <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                 <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
                   {t('controls.label')}
                 </label>
                 <div className="relative">
                   <textarea
                     id="prompt"
                     className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                     placeholder={t('controls.placeholder')}
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={handleKeyDown}
                     disabled={appState === AppState.PROCESSING}
                   />
                   <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                     {t('controls.cmdEnter')}
                   </div>
                 </div>

                 <div className="mt-4 flex gap-2">
                   <Button 
                     variant="primary" 
                     className="w-full" 
                     onClick={handleEdit} 
                     disabled={!prompt.trim()}
                     isLoading={appState === AppState.PROCESSING}
                     icon={<Wand2 className="w-4 h-4" />}
                   >
                     {appState === AppState.PROCESSING ? t('controls.generating') : t('controls.generate')}
                   </Button>
                 </div>
               </div>

               <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
                 <h3 className="text-sm font-semibold text-slate-300 mb-2">{t('controls.tryPrompts')}</h3>
                 <div className="space-y-2">
                   {(t('controls.prompts') as string[]).map((p, i) => (
                     <button
                       key={i}
                       className="w-full text-left text-sm text-slate-400 hover:text-primary-400 hover:bg-slate-800/50 px-3 py-2 rounded-lg transition-colors truncate"
                       onClick={() => setPrompt(p)}
                     >
                       {p}
                     </button>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )}

        {appState === AppState.RESULT && currentImage && editedImageUrl && (
          <ResultView
            originalImage={currentImage}
            editedImageUrl={editedImageUrl}
            textResponse={textResponse}
            onReset={() => setAppState(AppState.EDITING)}
            onDownload={handleDownload}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800 text-center text-slate-600 text-sm">
        <p>{t('footer.text')}</p>
      </footer>
    </div>
  );
};

export default App;

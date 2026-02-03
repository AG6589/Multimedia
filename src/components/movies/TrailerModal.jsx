import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, trailerUrl, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {trailerUrl ? (
                    <iframe
                        src={`${trailerUrl}?autoplay=1`}
                        title={`${title} Trailer`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                        <p className="text-xl font-semibold mb-2">Trailer not found</p>
                        <p className="text-gray-400">Sorry, we couldn't find a trailer for this movie on YouTube.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrailerModal;

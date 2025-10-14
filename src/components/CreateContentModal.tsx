import {CrossIcon} from "../icons/CrossIcon";
import {Button} from "../components/Button";
import {Input} from "../components/Input" ;
import {useState , useRef} from "react";
import {BACKEND_URL} from "../components/config" ; 
import axios from "axios" ;

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    LinkedIn = "linkedin",
    TikTok = "tiktok",
    Document = "document",
    Link = "link",
    Notes = "notes"
}
type CreateContentModalProps = {
    open : boolean ;
    onClose : () => void ;
};
export function CreateContentModal ({open, onClose} : CreateContentModalProps) { 
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null); 
    const modalRef = useRef<HTMLDivElement>(null);
    const [type, setType] = useState(ContentType.Link);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        if (!title || !link) {
            setError("Please fill in both title and link/content");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type 
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            // Clear form
            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            
            onClose();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Failed to save content");
            } else {
                setError("Failed to save content");
            }
        } finally {
            setIsLoading(false);
        }
    }  
    
    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    }

    const contentTypeOptions = [
        { type: ContentType.Link, label: "🔗 Link", icon: "🔗" },
        { type: ContentType.Youtube, label: "📺 YouTube", icon: "📺" },
        { type: ContentType.Twitter, label: "🐦 Twitter", icon: "🐦" },
        { type: ContentType.Instagram, label: "📸 Instagram", icon: "📸" },
        { type: ContentType.LinkedIn, label: "💼 LinkedIn", icon: "💼" },
        { type: ContentType.TikTok, label: "🎵 TikTok", icon: "🎵" },
        { type: ContentType.Document, label: "📄 Document", icon: "📄" },
        { type: ContentType.Notes, label: "📝 Notes", icon: "📝" }
    ];

    if (!open) return null;

    return (
        <div onClick={handleOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">        
            <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Add New Content</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <CrossIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <Input 
                                reference={titleRef} 
                                classy="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                placeholder="Enter a descriptive title" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {type === ContentType.Notes ? "Content" : "Link"}
                            </label>
                            <Input 
                                reference={linkRef} 
                                classy="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                placeholder={type === ContentType.Notes ? "Write your notes here..." : "Paste the URL here"} 
                            />
                        </div>
                    </div>

                    {/* Content Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Content Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {contentTypeOptions.map((option) => (
                                <button
                                    key={option.type}
                                    onClick={() => setType(option.type)}
                                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                        type === option.type
                                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>{option.icon}</span>
                                        <span className="hidden sm:inline">{option.label.split(' ')[1]}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        onClick={addContent} 
                        variant="primary" 
                        text={isLoading ? "Saving..." : "Save Content"}
                        fullWidth={true}
                        loading={isLoading}
                    />
                </div>
            </div>
        </div>
    );

}
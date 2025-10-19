import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "linkedin" | "tiktok" | "document" | "link" | "notes";
    contentId?: string;
    onDelete?: (contentId: string) => void;
    onOpenAI?: (contentId: string, title: string) => void;
}

export function Card({ title, link, type, contentId, onDelete, onOpenAI }: CardProps) {

    const getVideoId = (url: string) => {
        const patterns = [
            /youtu\.be\/([a-zA-Z0-9_-]+)/,
            /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const getInstagramEmbedUrl = (url: string) => {
        // Extract Instagram post/reel ID from URL
        // Formats: /p/POST_ID/, /reel/POST_ID/
        const match = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
        if (match) {
            return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
        }
        return null;
    };

    const getTikTokVideoId = (url: string) => {
        // Extract TikTok video ID
        const match = url.match(/\/video\/(\d+)/);
        return match ? match[1] : null;
    };

    const getTypeIcon = () => {
        switch (type) {
            case "twitter": return "🐦";
            case "youtube": return "📺";
            case "instagram": return "📸";
            case "linkedin": return "💼";
            case "tiktok": return "🎵";
            case "document": return "📄";
            case "notes": return "📝";
            case "link": return "🔗";
            default: return "📁";
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case "twitter": return "bg-blue-100 text-blue-700 border-blue-200";
            case "youtube": return "bg-red-100 text-red-700 border-red-200";
            case "instagram": return "bg-pink-100 text-pink-700 border-pink-200";
            case "linkedin": return "bg-blue-100 text-blue-800 border-blue-200";
            case "tiktok": return "bg-gray-100 text-gray-700 border-gray-200";
            case "document": return "bg-green-100 text-green-700 border-green-200";
            case "notes": return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "link": return "bg-purple-100 text-purple-700 border-purple-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const videoId = type === "youtube" ? getVideoId(link) : null;
    const instagramEmbedUrl = type === "instagram" ? getInstagramEmbedUrl(link) : null;
    const tiktokVideoId = type === "tiktok" ? getTikTokVideoId(link) : null;
    const domain = link ? new URL(link).hostname.replace('www.', '') : '';

    return (
        <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            {/* Content Type Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor()}`}>
                    {getTypeIcon()} {type}
                </span>
            </div>

            {/* Content Preview */}
            <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                {type === "youtube" && videoId && (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                )}

                {type === "instagram" && instagramEmbedUrl && (
                    <iframe
                        className="w-full h-full"
                        src={instagramEmbedUrl}
                        title="Instagram post"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                    />
                )}

                {type === "instagram" && !instagramEmbedUrl && (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-pink-50 to-purple-50">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">📸</div>
                            <p className="text-gray-600 text-sm mb-2">Instagram Content</p>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-800 text-sm underline"
                            >
                                View on Instagram
                            </a>
                        </div>
                    </div>
                )}

                {type === "tiktok" && tiktokVideoId && (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.tiktok.com/embed/v2/${tiktokVideoId}`}
                        title="TikTok video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {type === "tiktok" && !tiktokVideoId && (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">🎵</div>
                            <p className="text-gray-600 text-sm mb-2">TikTok Video</p>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-gray-900 text-sm underline"
                            >
                                View on TikTok
                            </a>
                        </div>
                    </div>
                )}

                {type === "linkedin" && (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">💼</div>
                            <p className="text-gray-600 text-sm mb-2">LinkedIn Post</p>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 text-sm underline"
                            >
                                View on LinkedIn
                            </a>
                        </div>
                    </div>
                )}

                {type === "twitter" && (
                    <div className="flex items-center justify-center h-full bg-blue-50">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">🐦</div>
                            <p className="text-gray-600 text-sm">Twitter Post</p>
                            <a
                                href={link.replace("x.com", "twitter.com")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                            >
                                View on Twitter
                            </a>
                        </div>
                    </div>
                )}

                {type === "document" && (
                    <div className="flex items-center justify-center h-full bg-green-50">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">📄</div>
                            <p className="text-gray-600 text-sm">Document</p>
                        </div>
                    </div>
                )}

                {type === "notes" && (
                    <div className="flex items-center justify-center h-full bg-yellow-50 p-4">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <p className="text-gray-600 text-sm line-clamp-3">{link}</p>
                        </div>
                    </div>
                )}

                {type === "link" && (
                    <div className="flex items-center justify-center h-full bg-purple-50">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-2">🔗</div>
                            <p className="text-gray-600 text-sm">External Link</p>
                            <p className="text-xs text-gray-500 mt-1">{domain}</p>
                        </div>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                    >
                        <ShareIcon />
                    </a>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200">
                    {title || "Untitled"}
                </h3>
                
                <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-gray-500 truncate flex-1 mr-2">
                        {domain || "No domain"}
                    </p>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (contentId && onOpenAI) {
                                    onOpenAI(contentId, title);
                                }
                            }}
                            className="p-1 sm:p-1.5 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                            title="AI Assistant"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </button>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 sm:p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Open link"
                        >
                            <ShareIcon />
                        </a>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                console.log("Delete button clicked. ContentId:", contentId);
                                console.log("onDelete function exists:", !!onDelete);
                                if (contentId && onDelete) {
                                    if (confirm('Are you sure you want to delete this item?')) {
                                        console.log("User confirmed deletion");
                                        onDelete(contentId);
                                    } else {
                                        console.log("User cancelled deletion");
                                    }
                                } else {
                                    console.warn("Missing contentId or onDelete function", { contentId, onDelete: !!onDelete });
                                }
                            }}
                            className="p-1 sm:p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200"
                            title="Delete item"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './config';

interface AIModalProps {
    contentId: string;
    title: string;
    onClose: () => void;
}

export function AIModal({ contentId, title, onClose }: AIModalProps) {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'summary' | 'ask'>('summary');

    const handleSummarize = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/ai/summarize`, {
                contentId
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error summarizing:", error);
            alert("Failed to generate summary");
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuestion = async () => {
        if (!question.trim()) {
            alert("Please enter a question");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/ai/ask`, {
                contentId,
                question
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error asking question:", error);
            alert("Failed to get answer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">✨ AI Assistant</h2>
                            <p className="text-purple-100 text-sm">{title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                            activeTab === 'summary'
                                ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        📝 Summarize
                    </button>
                    <button
                        onClick={() => setActiveTab('ask')}
                        className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                            activeTab === 'ask'
                                ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        💬 Ask Question
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {activeTab === 'summary' ? (
                        <div className="space-y-4">
                            {!summary ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🤖</div>
                                    <p className="text-gray-600 mb-6">
                                        Get an AI-powered summary of this content
                                    </p>
                                    <button
                                        onClick={handleSummarize}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Generating...
                                            </span>
                                        ) : (
                                            'Generate Summary'
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary:</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
                                    <button
                                        onClick={handleSummarize}
                                        disabled={loading}
                                        className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
                                    >
                                        🔄 Regenerate
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ask anything about this content:
                                </label>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="E.g., What are the main points? What is this about?"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                    rows={3}
                                />
                            </div>
                            <button
                                onClick={handleAskQuestion}
                                disabled={loading || !question.trim()}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Getting Answer...
                                    </span>
                                ) : (
                                    'Get Answer'
                                )}
                            </button>

                            {answer && (
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 mt-4">
                                    <h3 className="text-lg font-semibold text-purple-900 mb-2">💡 Answer:</h3>
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{answer}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
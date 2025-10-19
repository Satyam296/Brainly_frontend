import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { AIModal } from "../components/AIModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../components/config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<{ id: string; title: string } | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]); // Only depend on modalOpen to avoid infinite loop

  // Define content type
  type ContentType = {
    _id?: string;
    title?: string;
    link?: string;
    type?: string;
  };

  // Filter contents based on search and type
  const filteredContents = contents.filter((content: ContentType) => {
    const matchesSearch = content.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.link?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || content.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (contentId: string) => {
    try {
      console.log("Attempting to delete content with ID:", contentId);
      console.log("Token:", localStorage.getItem("token"));
      
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          contentId: contentId
        }
      });
      
      console.log("Delete response:", response);
      
      if (response.status === 200) {
        // Refresh the content list after successful deletion
        alert("Content deleted successfully!");
        refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } }; message: string };
        console.error("Error response:", axiosError.response?.data);
        alert(`Failed to delete content: ${axiosError.response?.data?.message || axiosError.message}`);
      } else {
        alert("Failed to delete content. Please try again.");
      }
    }
  };

  const handleOpenAI = (contentId: string, title: string) => {
    setSelectedContent({ id: contentId, title });
    setAiModalOpen(true);
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      // Show success message
      alert(`Share link copied to clipboard!\n${shareUrl}`);
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to create share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const contentTypes = ["all", "twitter", "youtube", "document", "link"];
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "twitter": return "🐦";
      case "youtube": return "📺";
      case "document": return "📄";
      case "link": return "🔗";
      default: return "📁";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static z-40`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 lg:ml-72 w-full">
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        
        {aiModalOpen && selectedContent && (
          <AIModal
            contentId={selectedContent.id}
            title={selectedContent.title}
            onClose={() => {
              setAiModalOpen(false);
              setSelectedContent(null);
            }}
          />
        )}
        
        {aiModalOpen && selectedContent && (
          <AIModal
            contentId={selectedContent.id}
            title={selectedContent.title}
            onClose={() => {
              setAiModalOpen(false);
              setSelectedContent(null);
            }}
          />
        )}
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 pt-16 lg:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Brain</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {contents.length} items in your collection
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              />
              <Button
                onClick={handleShare}
                variant="secondary"
                text={isSharing ? "Sharing..." : "Share"}
                startIcon={<ShareIcon />}
                loading={isSharing}
              />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search your brain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {contentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filterType === type
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-4 sm:p-6">
          {filteredContents.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="text-4xl sm:text-6xl mb-4">🧠</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterType !== "all" 
                  ? "No matching content found" 
                  : "Your brain is empty"}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || filterType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start building your second brain by adding your first piece of content"}
              </p>
              {(!searchTerm && filterType === "all") && (
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="primary"
                  text="Add Your First Content"
                  startIcon={<PlusIcon />}
                />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredContents.map((content: ContentType, index: number) => (
                <div
                  key={content._id || index}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <Card
                    type={(content.type as "link" | "twitter" | "youtube" | "document" | "notes") || "link"}
                    link={content.link || ""}
                    title={content.title || "Untitled"}
                    contentId={content._id}
                    onDelete={handleDelete}
                    onOpenAI={handleOpenAI}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {filteredContents.length > 0 && (
          <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs sm:text-sm text-gray-500">
              <span>
                Showing {filteredContents.length} of {contents.length} items
              </span>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                <span>🐦 {contents.filter((c: ContentType) => c.type === "twitter").length}</span>
                <span>📺 {contents.filter((c: ContentType) => c.type === "youtube").length}</span>
                <span>📄 {contents.filter((c: ContentType) => c.type === "document").length}</span>
                <span>🔗 {contents.filter((c: ContentType) => c.type === "link").length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


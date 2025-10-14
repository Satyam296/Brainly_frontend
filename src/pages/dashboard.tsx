import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../components/config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

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
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          contentId: contentId
        }
      });
      
      if (response.status === 200) {
        // Refresh the content list after successful deletion
        refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete content. Please try again.");
    }
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
      <Sidebar />
      
      <div className="flex-1 ml-72">
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Brain</h1>
              <p className="text-gray-600 mt-1">
                {contents.length} items in your collection
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              />
              <Button
                onClick={handleShare}
                variant="secondary"
                text={isSharing ? "Sharing..." : "Share Brain"}
                startIcon={<ShareIcon />}
                loading={isSharing}
              />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search your brain..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto">
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
        <div className="p-6">
          {filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterType !== "all" 
                  ? "No matching content found" 
                  : "Your brain is empty"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {filteredContents.length > 0 && (
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                Showing {filteredContents.length} of {contents.length} items
              </span>
              <div className="flex gap-4">
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


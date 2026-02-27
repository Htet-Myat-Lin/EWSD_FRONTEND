import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Avatar,
  Divider,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useCreateComment } from "../hooks/useCreateComment";
import { useEditComment } from "../hooks/useEditComment";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useComments } from "../hooks/useComments";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/utils/date";
import { LuPencil, LuTrash } from "react-icons/lu";

export function CommentDialog({ isOpen, onOpenChange, contribution }) {
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const { user, loading: isAuthLoading } = useAuth();
  // Check if user is marketing_coordinator - only they can create, update, delete comments
  const isMarketingCoordinator = user?.role?.name === "marketing_coordinator";
  
  const { data, isPending: isFetching } = useComments(contribution?.id);
  const { mutate: createComment, isPending: isSubmitting } = useCreateComment(contribution?.id);
  const { mutate: editComment, isPending: isEditing } = useEditComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  
  // Handle both array and array-like object responses
  const comments = data || [];

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!contribution?.id) {
      toast.error("No contribution selected");
      return;
    }

    createComment(comment);

    setComment("");
  };

  const handleClose = () => {
    setComment("");
    setEditingCommentId(null);
    setEditContent("");
    onOpenChange(false);
  };

  const handleEdit = (commentItem) => {
    setEditingCommentId(commentItem.id);
    setEditContent(commentItem.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (!editingCommentId) {
      toast.error("No comment selected for editing");
      return;
    }

    editComment({ commentId: editingCommentId, content: editContent }, {
      onSuccess: () => {
        handleCancelEdit();
      }
    });
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(commentId);
    }
  };

  return (
    <>
      {/* Show loading while checking auth */}
      {isAuthLoading ? (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
          <ModalContent>
            <ModalBody>
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onOpenChange={handleClose} size="lg">
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                {/* Only show contribution details for marketing_coordinator */}
                {isMarketingCoordinator && contribution && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">
                      Commenting on:
                    </p>
                    <p className="text-sm text-gray-900">{contribution.title}</p>
                    <p className="text-xs text-gray-500">
                      by {contribution.user?.name || "Unknown"}
                    </p>
                  </div>
                )}
                
                {/* Comments List */}
                <div className="mb-4 max-h-64 overflow-y-auto">
                  {isFetching ? (
                    <div className="text-center py-4 text-gray-500">Loading comments...</div>
                  ) : comments.length > 0 ? (
                    <div className="space-y-3">
                      {comments.map((commentItem) => (
                        <div key={commentItem.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar
                                name={commentItem.user?.name || "U"}
                                size="sm"
                                className="text-xs"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {commentItem.user?.name || "Unknown User"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(commentItem.created_at)}
                                </p>
                              </div>
                            </div>
                            {isMarketingCoordinator && user && commentItem.user_id === user.id && (
                              <div className="flex">
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="primary"
                                  isIconOnly
                                  aria-label="Edit comment"
                                  onPress={() => handleEdit(commentItem)}
                                  isDisabled={editingCommentId !== null}
                                >
                                  <LuPencil size={15} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="light"
                                  color="danger"
                                  isIconOnly
                                  aria-label="Delete comment"
                                  onPress={() => handleDelete(commentItem.id)}
                                  isDisabled={editingCommentId !== null || isDeleting}
                                >
                                  <LuTrash size={15} />
                                </Button>
                              </div>
                            )}
                          </div>
                          {editingCommentId === commentItem.id ? (
                            <div className="ml-10">
                              <Textarea
                                value={editContent}
                                onValueChange={setEditContent}
                                minRows={2}
                                variant="bordered"
                                isDisabled={isEditing}
                              />
                              <div className="flex gap-2 mt-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="light"
                                  onPress={handleCancelEdit}
                                  isDisabled={isEditing}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onPress={handleSaveEdit}
                                  isLoading={isEditing}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-700 ml-10">
                              {commentItem.content}
                            </p>
                          )}
                          
                          {/* Replies */}
                          {commentItem.replies && commentItem.replies.length > 0 && (
                            <div className="ml-8 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
                              {commentItem.replies.map((reply) => (
                                <div key={reply.id} className="p-2 bg-white rounded">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Avatar
                                      name={reply.user?.name || "U"}
                                      size="xs"
                                      className="text-xs"
                                    />
                                    <span className="text-xs font-medium text-gray-900">
                                      {reply.user?.name || "Unknown User"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatDate(reply.created_at)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 ml-6">
                                    {reply.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No comments yet.
                    </div>
                  )}
                </div>
                
                <Divider className="my-4" />
                
                {/* Only marketing_coordinator can create comments */}
                {isMarketingCoordinator ? (
                  <>
                    <Textarea
                      label="Comment"
                      placeholder="Enter your feedback or comments for the student..."
                      value={comment}
                      onValueChange={setComment}
                      minRows={4}
                      variant="bordered"
                      isDisabled={isSubmitting}
                    />
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                    <p>Comments are for display only. Contact the coordinator for feedback.</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={handleClose}
                  isDisabled={isSubmitting}
                >
                  Cancel
                </Button>
                {isMarketingCoordinator && (
                  <Button
                    color="primary"
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={!comment.trim() || isSubmitting || new Date().getTime() - new Date(contribution?.created_at).getTime() > 14 * 24 * 60 * 60 * 1000}
                  >
                    Submit Comment
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      )}
    </>
  );
}

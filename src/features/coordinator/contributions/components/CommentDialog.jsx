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
  Input,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useCreateComment } from "../hooks/useCreateComment";
import { useEditComment } from "../hooks/useEditComment";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useComments } from "../hooks/useComments";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/utils/date";
import { LuPencil, LuTrash, LuReply } from "react-icons/lu";
import { resolveProfileImageUrl } from "@/utils/profile-image";

export function CommentDialog({ isOpen, onOpenChange, contribution }) {
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState("");

  const { user, loading: isAuthLoading } = useAuth();
  // Check user roles
  const isAdmin = user?.role?.name === "admin";
  const isMarketingCoordinator = user?.role?.name === "marketing_coordinator";
  const isStudent = user?.role?.name === "student";
  const canManageComments = isAdmin || isMarketingCoordinator;
  const canComment = isMarketingCoordinator || isStudent;
  
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

    createComment({ content: comment, parentId: null });

    setComment("");
  };

  const handleClose = () => {
    setComment("");
    setEditingCommentId(null);
    setEditContent("");
    setReplyingToId(null);
    setReplyContent("");
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

  const handleReply = (commentId) => {
    setReplyingToId(commentId);
    setReplyContent("");
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyContent("");
  };

  const handleEditReply = (reply) => {
    setEditingReplyId(reply.id);
    setEditReplyContent(reply.content);
  };

  const handleCancelEditReply = () => {
    setEditingReplyId(null);
    setEditReplyContent("");
  };

  const handleSaveEditReply = async () => {
    if (!editReplyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    if (!editingReplyId) {
      toast.error("No reply selected for editing");
      return;
    }

    editComment({ commentId: editingReplyId, content: editReplyContent }, {
      onSuccess: () => {
        handleCancelEditReply();
      }
    });
  };

  const handleDeleteReply = (replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      deleteComment(replyId);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    if (!contribution?.id) {
      toast.error("No contribution selected");
      return;
    }

    createComment({ content: replyContent, parentId: replyingToId });

    setReplyContent("");
    setReplyingToId(null);
  };

  return (
    <>
      {/* Show loading while checking auth */}
      {isAuthLoading ? (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
          <ModalContent>
            <ModalBody>
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onOpenChange={handleClose} size="xl">
        <ModalContent>
          {(handleClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                {/* Only show contribution details for admin/coordinator */}
                {canManageComments && contribution && (
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
                                size="sm"
                                className="text-xs"
                                name={commentItem.user?.name || "U"}
                                src={resolveProfileImageUrl(commentItem.user?.profile_path)}
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
                            {(canManageComments || (isStudent && commentItem.user_id === user?.id)) && (
                              <div className="flex">
                                {(isMarketingCoordinator || isStudent) && user && commentItem.user_id === user.id && (
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
                                )}
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
                          
                          {/* Reply Button - For admin, coordinator, and student */}
                          {canComment && !commentItem.parent_id && (
                            <div className="ml-10 mt-2">
                              {replyingToId === commentItem.id ? (
                                <div className="mt-2">
                                  <Input
                                    placeholder={`Reply to ${commentItem.user?.name || 'this comment'}...`}
                                    value={replyContent}
                                    onValueChange={setReplyContent}
                                    variant="bordered"
                                    size="sm"
                                    isDisabled={isSubmitting}
                                  />
                                  <div className="flex gap-2 mt-2 justify-end">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      onPress={handleCancelReply}
                                      isDisabled={isSubmitting}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      onPress={handleSubmitReply}
                                      isLoading={isSubmitting}
                                    >
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="light"
                                  startContent={<LuReply size={14} />}
                                  onPress={() => handleReply(commentItem.id)}
                                  isDisabled={editingCommentId !== null}
                                >
                                  Reply
                                </Button>
                              )}
                            </div>
                          )}
                          
                          {/* Replies */}
                          {commentItem.replies && commentItem.replies.length > 0 && (
                            <div className="ml-8 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
                              {commentItem.replies.map((reply) => (
                                <div key={reply.id} className="p-2 bg-white rounded">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
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
                                    {(canManageComments || (isStudent && reply.user_id === user?.id)) && (
                                      <div className="flex">
                                        {(isMarketingCoordinator || isStudent) && reply.user_id === user?.id && (
                                          <Button
                                            size="sm"
                                            variant="light"
                                            color="primary"
                                            isIconOnly
                                            aria-label="Edit reply"
                                            onPress={() => handleEditReply(reply)}
                                            isDisabled={editingReplyId !== null || editingCommentId !== null}
                                          >
                                            <LuPencil size={12} />
                                          </Button>
                                        )}
                                        <Button
                                          size="sm"
                                          variant="light"
                                          color="danger"
                                          isIconOnly
                                          aria-label="Delete reply"
                                          onPress={() => handleDeleteReply(reply.id)}
                                          isDisabled={editingReplyId !== null || editingCommentId !== null || isDeleting}
                                        >
                                          <LuTrash size={12} />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  {editingReplyId === reply.id ? (
                                    <div className="ml-6">
                                      <Input
                                        value={editReplyContent}
                                        onValueChange={setEditReplyContent}
                                        variant="bordered"
                                        size="sm"
                                        isDisabled={isEditing}
                                      />
                                      <div className="flex gap-2 mt-2 justify-end">
                                        <Button
                                          size="sm"
                                          variant="light"
                                          onPress={handleCancelEditReply}
                                          isDisabled={isEditing}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          size="sm"
                                          color="primary"
                                          onPress={handleSaveEditReply}
                                          isLoading={isEditing}
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-700 ml-6">
                                      {reply.content}
                                    </p>
                                  )}
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
                
                {/* All authenticated users can comment */}
                {canComment && (
                  <>
                    <Textarea
                      label="Comment"
                      placeholder={isStudent ? "Add a comment..." : "Enter your feedback or comments for the student..."}
                      value={comment}
                      onValueChange={setComment}
                      minRows={4}
                      variant="bordered"
                      isDisabled={isSubmitting}
                    />
                  </>
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
                {canComment && (
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

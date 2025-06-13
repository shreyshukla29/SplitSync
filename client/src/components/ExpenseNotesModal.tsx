import React, { useState, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PaperAirplaneIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Comment {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ExpenseNote {
  content: string;
  author: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ExpenseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseTitle: string;
  note?: ExpenseNote;
  comments: Comment[];
  onAddComment: (message: string) => void;
  onEditNote?: (content: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

function ExpenseNotesModal({ 
  isOpen, 
  onClose, 
  expenseTitle, 
  note, 
  comments, 
  onAddComment,
  onEditNote,
  onDeleteComment 
}: ExpenseNotesModalProps) {
  const [newComment, setNewComment] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editedNote, setEditedNote] = useState(note?.content || '');
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input after modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, comments]);

  const handleSendComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
      // Scroll to bottom after adding comment
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const handleSaveNote = () => {
    if (onEditNote && editedNote.trim()) {
      onEditNote(editedNote.trim());
      setIsEditingNote(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-semibold text-white flex items-center space-x-2">
                    <span>📝</span>
                    <span>Notes for "{expenseTitle}"</span>
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Note Section */}
                  {note && (
                    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-white">Expense Note</h3>
                        {note.isCurrentUser && onEditNote && (
                          <button
                            onClick={() => setIsEditingNote(!isEditingNote)}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      {isEditingNote ? (
                        <div className="space-y-3">
                          <textarea
                            value={editedNote}
                            onChange={(e) => setEditedNote(e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            rows={3}
                            placeholder="Add a note about this expense..."
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSaveNote}
                              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setIsEditingNote(false);
                                setEditedNote(note.content);
                              }}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <blockquote className="italic text-gray-200 mb-2 pl-4 border-l-2 border-indigo-500">
                            "{note.content}"
                          </blockquote>
                          <div className="text-xs text-gray-500">
                            by {note.author} • {formatTimestamp(note.timestamp)}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Comments Section */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
                      <span>💬</span>
                      <span>Comments ({comments.length})</span>
                    </h3>
                    
                    {/* Comments List */}
                    <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-2">
                      {comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <span className="text-4xl mb-2 block">💭</span>
                          <p>No comments yet. Be the first to comment!</p>
                        </div>
                      ) : (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="bg-white/5 rounded-xl p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-white text-sm">
                                    {comment.author}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500" title={comment.timestamp}>
                                      {formatTimestamp(comment.timestamp)}
                                    </span>
                                    {comment.isCurrentUser && onDeleteComment && (
                                      <button
                                        onClick={() => onDeleteComment(comment.id)}
                                        className="text-gray-500 hover:text-red-400 transition-colors duration-200"
                                      >
                                        <TrashIcon className="h-3 w-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-gray-100 text-sm">{comment.message}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={commentsEndRef} />
                    </div>

                    {/* Add Comment Input */}
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        Y
                      </div>
                      <div className="flex-1 flex space-x-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="Add a comment..."
                        />
                        <button
                          onClick={handleSendComment}
                          disabled={!newComment.trim()}
                          className={`p-2 rounded-xl transition-all duration-300 ${
                            newComment.trim()
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-105 hover:shadow-lg'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <PaperAirplaneIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ExpenseNotesModal;
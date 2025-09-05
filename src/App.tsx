import "./styles/globals.scss";
import React, { useEffect, useMemo, useState } from "react";
import s from "./App.module.scss";
import type { Post, PostInput } from "./shared/types";
import { fetchPosts, createPost, updatePost, deletePost } from "./shared/api/posts";
import PostList from "./components/PostList/PostList";
import Modal from "./components/Modal/Modal";
import PostForm from "./components/PostForm/PostForm";
import { formatDateTime } from "./utils/format";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  async function load() {
    setLoading(true);
    setError(undefined);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err: any) {
      setError(err?.message ?? "Не удалось загрузить посты");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreateClick = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleOpen = (post: Post) => setOpenedPost(post);

  async function handleSubmit(input: PostInput) {
    if (editingPost) {
      await updatePost(editingPost.id, input);
    } else {
      await createPost(input);
    }
    setIsFormOpen(false);
    setEditingPost(null);
    await load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить пост?")) return;
    await deletePost(id);
    await load();
  }

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [posts]
  );

  return (
    <div className={"main_wrapper"}>
      <main className={s.container}>
        <PostList
          posts={sorted}
          isLoading={loading}
          error={error}
          onCreate={handleCreateClick}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onOpen={handleOpen}
        />

        {isFormOpen && (
          <Modal
            title={editingPost ? "Редактировать пост" : "Новый пост"}
            onClose={() => setIsFormOpen(false)}
          >
            <PostForm
              initial={editingPost}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </Modal>
        )}

        {openedPost && (
          <Modal title={openedPost.title} onClose={() => setOpenedPost(null)}>
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ opacity: 0.85, fontSize: 13 }}>
                Автор: {openedPost.author}
              </div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>
                Создано: {formatDateTime(openedPost.created_at)}
              </div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>
                Обновлено: {formatDateTime(openedPost.updated_at)}
              </div>
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  marginTop: 8,
                }}
              >
                {openedPost.content}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                  marginTop: 8,
                }}
              >
                <button
                  className={`${s.btn} ${s.btnPrimary}`}
                  onClick={() => {
                    setOpenedPost(null);
                    handleEditClick(openedPost);
                  }}
                >
                  Изменить
                </button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
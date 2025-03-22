import { useState, useEffect } from "react";
import { Author } from "../../domain/authors/authors";
import Navbar from "../../components/Navbar";
import AuthorTable from "../../components/authors/AuthorTable";
import AuthorForm from "../../components/authors/AuthorForm";
import { getAuthors, updateAuthor, addAuthor, deleteAuthor } from "../../services/Author/AuthorService";

const AuthorPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  // Fetch authors when component mounts
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (err) {
      console.error("Failed to fetch authors.");
    }
  };

  // Add or update an author based on the form
  const handleAddOrUpdate = async (author: Author) => {
    try {
      if (isEdit && author.authorID) {
        await updateAuthor(author);
      } else {
        await addAuthor(author);
      }
      fetchAuthors(); // Reload the list after adding/updating
      setSelectedAuthor(null);
      setIsEdit(false); // Reset form state
    } catch (err) {
      console.error(`Failed to ${isEdit ? "update" : "add"} author.`);
    }
  };

  // Set the author for editing
  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setIsEdit(true); // Set the edit state
  };

  // Handle author deletion
  const handleDelete = async (authorId: number) => {
    try {
      await deleteAuthor(authorId);
      fetchAuthors(); // Reload the list after deletion
    } catch (err) {
      console.error("Failed to delete author", err);
    }
  };
  

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-[222px] w-full">
        <div className="h-[65px] bg-blue shadow-md flex items-center px-5">
          <h2 className="text-lg font-semibold">Author Info</h2>
        </div>
        <div className="bg-gray-200 p-5 h-[calc(100vh-65px)] overflow-y-auto">
          <AuthorForm
            author={selectedAuthor}
            isEdit={isEdit}
            onSubmit={handleAddOrUpdate}
          />
          <AuthorTable
            authors={authors}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;

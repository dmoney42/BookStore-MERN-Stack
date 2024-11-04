import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import UserContext from '../UserContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);  // Access the context data

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/*Comment: everything is required to be enclosed in a HTML tag */}
      <p>testing testing 1</p>

      {user.name}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3x1 my-8">Books List</h1>
          <p>inside flex justify between items center</p>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4x1" />
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="2-full border-separate border-spacing">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md-hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>

          <tbody>
            {books?.map((book,index) => (
              <tr key={book?._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index+1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book?.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center maz-md:hidden">
                  {book?.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book?.publishYear                 }
                </td>

                <td className='border border-slate-700 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                            <Link to={`/books/details/${book._id}`}>
                              <BsInfoCircle className='text-2x1 text-green-800'/>
                            </Link>

                            <Link to={`/books/edit/${book._id}`}>
                              <AiOutlineEdit className='text-2x1 text-yellow-600'/>
                            </Link>

                            <Link to={`/books/delete/${book._id}`}>
                              <MdOutlineDelete className='text-2x1 text-'/>
                            </Link>

                        </div>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

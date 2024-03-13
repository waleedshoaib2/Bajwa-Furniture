import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminDeleteCategory } from "../../lib/axiosAPI"; // Update your API function
import { logout } from "../../redux/action/apiUserAction";
import Paginate from "../../components/Paginate/index.jsx";
import { useSearchParams } from "react-router-dom";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import { adminGetCategory } from "../../lib/axiosAPI.js";

export default function AdminCategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(true);
  const [error, setError] = React.useState();
  const [searchParams] = useSearchParams();
  const currPageQuery = searchParams.get("currPage");

  let { userInfo } = useSelector((state) => state.user);
  let [categories, setCategories] = React.useState([]); // Update state to store categories

  const getAllCategories = useCallback(() => {
    adminGetCategory(userInfo, currPageQuery) // Update API function call
      .then(function (res) {
        setPending(false);
        setCategories(res.data);
        console.log(res)
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  }, [dispatch, userInfo, currPageQuery]);

  const deleteCategory = (categoryID) => {
    window.scrollTo(0, 0);
    adminDeleteCategory(userInfo, categoryID) // Update API function call
      .then(function (res) {
        getAllCategories();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const handleDelete = (categoryID) => {
    if (window.confirm("Are you sure you want to delete this Category?")) {
      deleteCategory(categoryID);
    }
  };

  React.useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <div className="admin-list">
      <DisplayPending pending={pending} />
      <div className="admin-list__container">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <div
          className="admin-add-button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/admin/createcategory"); // Update navigation path
          }}
        >
          Add New Category
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th> 
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => { // Update data mapping
              return (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>                 
                  <td>
                  <img
                      src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                      alt="edit_icon"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/admin/editproduct/${category._id}`);
                      }}
                    />
                    <img
                      onClick={() => handleDelete(category._id)}
                      src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                      alt="edit_icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
    
      </div>
    </div>
  );
}

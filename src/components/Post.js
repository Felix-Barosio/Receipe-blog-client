import React, { useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

const api = "http://localhost:9292/receipes";

// default states
const initialState = {
    meal_name: "",
    image_url: "",
    instructions: "",
    origin: "",
    category: "",
    video: "",
    ingredients: "",
};

const Post = ({ posts, loadPosts }) => {
    const [show, setShow] = useState(false);
    const [state, setState] = useState(initialState);
    const [userId, setUserId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // object destructuring
    const { meal_name,
        image_url,
        origin,
        category,
        ingredients,
        video,
        instructions
    } = state;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // enable us to input data on the input fields
    function handleChange(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    // handle the form submission
    function handleSubmit(e) {
        e.preventDefault();
        if (!meal_name || !image_url || !origin || !category || !ingredients || !video || !instructions) {
            toast.error("Ensure to fill all fields!");
        } else {
            if (!editMode) {
                axios.post(api, state);
                toast.success("Receipe Added Succesfully!");
                // restore the form input to default with no data
                setState({
                    meal_name: "",
                    image_url: "",
                    origin: "",
                    category: "",
                    ingredients: "",
                    video: "",
                    instructions: ""
                });
                // close modal after sucessfull submission
                handleClose();
                // rerender the loadPosts function
                loadPosts();
            } else {
                axios.patch(`${api}/${userId}`, state);
                toast.success("Updates Succesfully Done!");
                // restore the form input to default with no data
                setState({
                    meal_name: "",
                    image_url: "",
                    origin: "",
                    category: "",
                    ingredients: "",
                    video: "",
                    instructions: ""
                });
                // close modal after sucessfull submission
                handleClose();
                // rerender the loadPosts function
                loadPosts();
                setUserId(null);
                setEditMode(false);

            }
        }
    }

    const handleUpdate = (id) => {
        const singleUser = posts.find((item) => item.id === id);
        setState({ ...singleUser });
        setUserId(id);
        setEditMode(true);
        handleShow();
        // rerender the loadPosts function
        loadPosts();
    };

    // handle the delete operation
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure want to delete this post?")) {
            axios.delete(`${api}/${id}`);
            toast.success("Deleted successfully!");
            // rerender the loadPosts function
            loadPosts();
        }
    };

    // search filter
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = posts.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    };
    return (
        <div>
            <div className="row d-flex align-items-center">
                <div className="col-md-8">
                    <Button variant="secondary" className="post__receipe" onClick={handleShow}>
                        Post Receipe.
                    </Button>
                </div>
                <div className="col-md-4">
                    <form action="">
                        <div className="blog__search">
                            <input
                                type="search"
                                className="header-search-input"
                                placeholder="Search Receipe"
                                onChange={(e) => searchItems(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                {searchInput.length > 1
                    ? filteredResults.map(({ meal_name, image_url, origin, category, ingredients, instructions, id }) => {
                        return (
                            <div className="col-md-4" key={id}>
                                <div className="post__wrapper">
                                    <h4 className="p-2 text-center food__head">{meal_name}</h4>
                                    <div className="post__image_url">
                                        <img src={image_url} alt={meal_name}></img>
                                    </div>
                                    <p className="story__desc"><h6 className="food__body">Country of Origin</h6>{origin}</p>
                                    <p className="story__desc"><h6 className="food__body">Food Category</h6> {category}</p>
                                    <p className="story__desc"><h5 className="food__body">Receipe Ingredients</h5>{ingredients}</p>
                                    {/* <a src={video} alt={BsYoutube} >{video}</a> */}
                                    <p className="story__desc"><h5 className="food__body">How to Prepare</h5>{instructions}</p>
                                    <div className="action__icons">
                                        <div
                                            className="post__edit"
                                            onClick={() => handleUpdate(id)}
                                        >
                                            <BsFillPencilFill />
                                        </div>
                                        <div
                                            className="post__delete"
                                            onClick={() => handleDelete(id)}
                                        >
                                            <BsFillTrashFill />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : posts.map(({ meal_name, image_url, origin, category, ingredients, video, instructions, id }) => {
                        return (
                            <div className="col-md-4" key={id}>
                                <div className="post__wrapper">
                                    <h4 className="p-2 text-center food__head">{meal_name}</h4>
                                    <div className="post__image_url">
                                        <img src={image_url} alt={meal_name}></img>
                                    </div>
                                    <p className="story__desc"><h6 className="food__body">Country of Origin</h6>{origin}</p>
                                    <p className="story__desc"><h6 className="food__body">Food Category</h6>{category}</p>
                                    <p className="story__desc"><h5 className="food__body">Receipe Ingredients</h5>{ingredients}</p>
                                    {/* <Link src={video} alt={BsYoutube} ><BsYoutube />Youtube</Link> */}
                                    <p className="story__desc"><h5 className="food__body">How to Prepare</h5>{instructions}</p>
                                    <div className="action__icons">
                                        <div
                                            className="post__edit"
                                            onClick={() => handleUpdate(id)}
                                        >
                                            <BsFillPencilFill />
                                        </div>
                                        <div
                                            className="post__delete"
                                            onClick={() => handleDelete(id)}
                                        >
                                            <BsFillTrashFill />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* toast action message notification */}
            <ToastContainer />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h4 className="text-center">Create Receipe Post</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicPostTitle">
                            <Form.Label className="form__label">Receipe Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter meal_name"
                                name="meal_name"
                                value={meal_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicimage_urlLink">
                            <Form.Label className="form__label">Image_url Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Paste your blog image_url here"
                                name="image_url"
                                value={image_url}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPostTitle">
                            <Form.Label className="form__label">Origin</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter country of origin"
                                name="origin"
                                value={origin}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPostTitle">
                            <Form.Label className="form__label">Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter receipe category"
                                name="category"
                                value={category}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPostTitle">
                            <Form.Label className="form__label">Ingredients</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter receipe ingredients"
                                style={{ height: "150px" }}
                                name="ingredients"
                                value={ingredients}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicimage_urlLink">
                            <Form.Label className="form__label">Youtube Video</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Paste your blog image_url here"
                                name="video"
                                value={video}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Label className="form__label">Instructions on how to cook</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Write you Instructions here"
                            style={{ height: "150px" }}
                            name="instructions"
                            value={instructions}
                            onChange={handleChange}
                        />
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                {editMode ? "Update" : "Post"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Post;

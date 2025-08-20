import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    id: "",
    title: "",
    description: "",
    review: "",
    image: "",
    link: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [reviewFilter, setReviewFilter] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddMovie = () => {
    if (!newMovie.id || !newMovie.title) return;
    setMovies([...movies, { ...newMovie, review: parseFloat(newMovie.review) }]);
    setNewMovie({ id: "", title: "", description: "", review: "", image: "", link: "" });
    setCurrentView("view");
  };

  const handleSearch = () => {
    let results = movies.filter((movie) => {
      if (searchType === "id") return movie.id === searchInput;
      return movie.title.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (reviewFilter) {
      results = results.filter((movie) => movie.review >= parseFloat(reviewFilter));
    }

    setSelectedMovie(results);
  };

  const handleDelete = () => {
    const targetMovie = movies.find((movie) =>
      searchType === "id" ? movie.id === searchInput : movie.title.toLowerCase() === searchInput.toLowerCase()
    );

    if (targetMovie) {
      setSelectedMovie([targetMovie]);
    } else {
      setSelectedMovie("notFound");
    }
  };

  const confirmDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    setSelectedMovie(null);
    setCurrentView("view");
  };

  const handleUpdate = () => {
    const targetMovie = movies.find((movie) =>
      searchType === "id" ? movie.id === searchInput : movie.title.toLowerCase() === searchInput.toLowerCase()
    );

    if (targetMovie) {
      setSelectedMovie([targetMovie]);
    } else {
      setSelectedMovie("notFound");
    }
  };

  const confirmUpdate = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, ...newMovie, review: parseFloat(newMovie.review) || movie.review }
          : movie
      )
    );
    setSelectedMovie(null);
    setCurrentView("view");
  };

  return (
    <div className="app-wrapper">
      <header className="header-section">
        <div className="header-content">
          <h1>Movie Management App</h1>
        </div>
      </header>

      <div className="app-container">
        <nav className="nav-section">
          <button onClick={() => setCurrentView("home")}>Home</button>
          <button onClick={() => setCurrentView("add")}>Add Movie</button>
          <button onClick={() => setCurrentView("search")}>Search Movie</button>
          <button onClick={() => setCurrentView("delete")}>Delete Movie</button>
          <button onClick={() => setCurrentView("update")}>Update Movie</button>
          <button onClick={() => setCurrentView("view")}>View All Movies</button>
        </nav>

        <main className="main-content">
          {currentView === "home" && (
            <div>
              <h2>Welcome to the Movie Management App!</h2>
              <p>
                This app allows you to add, search, delete, update, and view your favorite movies. You can also add links to watch them directly. Easily manage your entire movie collection with simple clicks and enjoy seamless tracking of your favorite titles.
              </p>
              <p>
                The app is user-friendly and helps you to:
                <ul>
                  <li>Add movies with details like reviews, images, and watch links.</li>
                  <li>Search movies by title or ID, with optional review filtering.</li>
                  <li>Delete movies after previewing their details.</li>
                  <li>Update movie details including description, image, and review.</li>
                  <li>Quickly view your entire collection at any time.</li>
                </ul>
              </p>
              <p>Start managing your movie library efficiently now!</p>
            </div>
          )}

          {currentView === "add" && (
            <div className="form-container">
              <h2>Add Movie</h2>
              <input type="text" placeholder="ID" value={newMovie.id} onChange={(e) => setNewMovie({ ...newMovie, id: e.target.value })} />
              <input type="text" placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
              <textarea placeholder="Description" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
              <input type="number" placeholder="Review (1-5)" value={newMovie.review} onChange={(e) => setNewMovie({ ...newMovie, review: e.target.value })} />
              <input type="text" placeholder="Image URL" value={newMovie.image} onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })} />
              <input type="text" placeholder="Watch Link" value={newMovie.link} onChange={(e) => setNewMovie({ ...newMovie, link: e.target.value })} />
              <button onClick={handleAddMovie}>Add Movie</button>
            </div>
          )}

          {currentView === "search" && (
            <div className="form-container">
              <h2>Search Movie</h2>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">Search by Title</option>
                <option value="id">Search by ID</option>
              </select>
              <input type="text" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <input type="number" placeholder="Optional: Minimum Review" value={reviewFilter} onChange={(e) => setReviewFilter(e.target.value)} />
              <button onClick={handleSearch}>Search</button>

              {selectedMovie && selectedMovie.length > 0 && (
                <div className="movie-list">
                  {selectedMovie.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <img src={movie.image} alt={movie.title} />
                      <h3>{movie.title}</h3>
                      <p>{movie.description}</p>
                      <p>Review: {movie.review}</p>
                      {movie.link && <a href={movie.link} target="_blank" rel="noopener noreferrer"><button className="watch-button">Watch</button></a>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === "delete" && (
            <div className="form-container">
              <h2>Delete Movie</h2>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">Delete by Title</option>
                <option value="id">Delete by ID</option>
              </select>
              <input type="text" placeholder="Enter ID or Title" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <button onClick={handleDelete}>Find Movie</button>

              {selectedMovie === "notFound" && <p>No such movie found.</p>}

              {selectedMovie && selectedMovie.length > 0 && (
                <div className="movie-list">
                  {selectedMovie.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <img src={movie.image} alt={movie.title} />
                      <h3>{movie.title}</h3>
                      <p>{movie.description}</p>
                      <button onClick={() => confirmDelete(movie.id)}>Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === "update" && (
            <div className="form-container">
              <h2>Update Movie</h2>
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">Update by Title</option>
                <option value="id">Update by ID</option>
              </select>
              <input type="text" placeholder="Enter ID or Title" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <button onClick={handleUpdate}>Find Movie</button>

              {selectedMovie === "notFound" && <p>No such movie found.</p>}

              {selectedMovie && selectedMovie.length > 0 && (
                <div className="update-section">
                  {selectedMovie.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <img src={movie.image} alt={movie.title} />
                      <h3>{movie.title}</h3>
                      <p>{movie.description}</p>
                      <input type="text" placeholder="New Description" onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
                      <input type="number" placeholder="New Review" onChange={(e) => setNewMovie({ ...newMovie, review: e.target.value })} />
                      <input type="text" placeholder="New Image URL" onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })} />
                      <button onClick={() => confirmUpdate(movie.id)}>Update</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentView === "view" && (
            <div>
              <h2>All Movies</h2>
              <div className="movie-list">
                {movies.map((movie) => (
                  <div key={movie.id} className="movie-card">
                    <img src={movie.image} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <p>Review: {movie.review}</p>
                    {movie.link && <a href={movie.link} target="_blank" rel="noopener noreferrer"><button className="watch-button">Watch</button></a>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

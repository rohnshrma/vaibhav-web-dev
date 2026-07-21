import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import "./App.css";

const initialState = {
  name: "",
  category: "",
  ingredients: "",
  time: "",
};

const recipeReducer = (state, action) => {
  if (
    action.type === "name" ||
    action.type === "category" ||
    action.type === "ingredients" ||
    action.type === "time"
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  if (action.type === "RESET") {
    return initialState;
  }

  return state;
};

const App = () => {
  const [recipeData, dispatch] = useReducer(recipeReducer, initialState);

  const [RecipeList, setRecipeList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [formError, setFormError] = useState("");

  const loadRecipeList = async () => {
    const res = await axios.get("http://localhost:3000/recipe");
    setRecipeList(res.data);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/recipe")
      .then((res) => setRecipeList(res.data))
      .catch((error) => console.error(error));
  }, []);

  const addRecipe = async () => {
    setFormError("");

    if (
      recipeData.name.trim() === "" ||
      recipeData.category.trim() === "" ||
      recipeData.ingredients.trim() === "" ||
      recipeData.time === ""
    ) {
      setFormError("Please fill all recipe fields before saving.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/recipe", {
        ...recipeData,
        time: Number(recipeData.time),
      });
      dispatch({ type: "RESET" });
      loadRecipeList();
    } catch (error) {
      setFormError(error.response?.data?.message || "Could not save recipe.");
      console.error(error);
    }
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:3000/recipe/${id}`);
    loadRecipeList();
  };

  const changeHandler = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const filteredRecipes = RecipeList.filter((recipe) => {
    const recipeText =
      `${recipe.name} ${recipe.category} ${recipe.ingredients}`.toLowerCase();
    return recipeText.includes(searchText.toLowerCase());
  });

  return (
    <main className="app-shell">
      <section className="hero-panel glass-panel">
        <div>
          <span className="eyebrow">Freshly saved</span>
          <h1>Recipe App</h1>
          <p>
            Collect quick kitchen ideas, sort them by mood, and keep every
            cooking note within reach.
          </p>
        </div>
        <div className="stats-card">
          <strong>{RecipeList.length}</strong>
          <span>{RecipeList.length === 1 ? "recipe" : "recipes"}</span>
        </div>
      </section>

      <section className="content-grid">
        <form
          className="recipe-form glass-panel"
          onSubmit={(e) => {
            e.preventDefault();
            addRecipe();
          }}
        >
          <div className="section-heading">
            <span className="eyebrow">Create</span>
            <h2>Add a recipe</h2>
          </div>

          <label>
            Recipe name
            <input
              name="name"
              type="text"
              placeholder="Spiced tomato pasta"
              onChange={changeHandler}
              value={recipeData.name}
            />
          </label>

          <label>
            Category
            <input
              name="category"
              type="text"
              placeholder="Dinner, snack, dessert"
              value={recipeData.category}
              onChange={changeHandler}
            />
          </label>

          <label>
            Ingredients
            <input
              type="text"
              name="ingredients"
              placeholder="Tomatoes, garlic, basil"
              value={recipeData.ingredients}
              onChange={changeHandler}
            />
          </label>

          <label>
            Cooking time
            <input
              type="number"
              name="time"
              placeholder="25 minutes"
              value={recipeData.time}
              onChange={changeHandler}
            />
          </label>

          <button className="primary-button" type="submit">
            Add Recipe
          </button>
          {formError && <p className="form-error">{formError}</p>}
        </form>

        <section className="recipe-list glass-panel">
          <div className="list-header">
            <div className="section-heading">
              <span className="eyebrow">Library</span>
              <h2>Your recipes</h2>
            </div>
            <input
              className="search-input"
              type="search"
              placeholder="Search recipes"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {RecipeList.length === 0 ? (
            <p className="empty-state">No recipes found.</p>
          ) : filteredRecipes.length === 0 ? (
            <p className="empty-state">No recipes match your search.</p>
          ) : (
            <div className="recipe-cards">
              {filteredRecipes.map((recipe) => (
                <article className="recipe-card" key={recipe._id}>
                  <div>
                    <h3>{recipe.name}</h3>
                    <span className="category-pill">
                      {recipe.category || "Uncategorized"}
                    </span>
                  </div>
                  <p>{recipe.ingredients || "No ingredients listed yet."}</p>
                  <div className="card-footer">
                    <span>
                      {recipe.time ? `${recipe.time} min` : "Time not set"}
                    </span>
                    <button
                      className="ghost-button"
                      onClick={() => deleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default App;

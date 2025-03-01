import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
//import { GoogleGenerativeAI } from '@google/generative-ai';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
  apiKey: "AIzaSyBNq7sBmdaBdvJVtwz9Pae0uwNmAD3slM0",
  authDomain: "websiteproject-2a2e7.firebaseapp.com",
  databaseURL: "https://websiteproject-2a2e7-default-rtdb.firebaseio.com",
  projectId: "websiteproject-2a2e7",
  storageBucket: "websiteproject-2a2e7.firebasestorage.app",
  messagingSenderId: "662839044013",
  appId: "1:662839044013:web:8a6e053d8c817356686324",
  measurementId: "G-T7F6059X09"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firestore initialized:", db);

// serch for recipes//
 // Capture the "Search" button click
 document.getElementById('searchRecipes').addEventListener('click', async () => {
  const rating = parseInt(document.getElementById('ratingSearch').value);
  if (rating >= 1 && rating <= 10) {
      const recipes = await searchRecipesByRating(rating);
      renderSearchedRecipes(recipes);
  } else {
      alert("Please enter a rating between 1 and 10.");
  }
});

// Function to search recipes based on rating
async function searchRecipesByRating(rating) {
  try {
      const recipeRef = collection(db, "recipes");
      const q = query(recipeRef, where("rating", "==", rating)); 
      const querySnapshot = await getDocs(q);
      const recipes = [];
      querySnapshot.forEach(doc => {
          recipes.push({ id: doc.id, ...doc.data() });
      });
      return recipes;
  } catch (error) {
      console.error("Error getting recipes:", error);
      return [];
  }
}


function renderSearchedRecipes(recipes) {
  const recipeList = document.getElementById('recipeList');
  recipelist.innerHTML = '';  
  if (recipes.length === 0) {
      recipelist.innerHTML = '<p>No recipes found with that rating.</p>';
  } else {
      recipes.forEach(recipe => {
          const recipeItem = document.createElement('div');
          recipeItem.innerHTML = `
              <h3>${recipe.name}</h3>
              <p><strong>Category:</strong> ${recipe.category}</p>
              <p><strong>Rating:</strong> ${recipe.rating}</p>
              <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
              <p><strong>Steps:</strong> ${recipe.steps}</p>
          `;
          recipeList.appendChild(recipeItem);
          reset.addEventListener("click", () => {
            renderRecipes()});
      });
  }
}


// Function to add a recipe
document.getElementById("add-recipe").addEventListener("click", async () => {
  const name = document.getElementById("recipe-name").value;
  const category = document.getElementById("recipe-category").value;
  const ingredients = document.getElementById("recipe-ingredients").value;
  const steps = document.getElementById("recipe-steps").value;
  const rating = document.getElementById("rating").value;
  if (name && category && ingredients && steps) {
    await addDoc(collection(db, "recipes"), {
      name,
      category,
      ingredients,
      steps,
      rating,
    });
    alert("Recipe added successfully!");

    // Refresh the list after adding
  } else {
    alert("Please fill out all fields.");
  }
});
renderRecipes(); 

async function renderRecipes() {
  const recipes = await getRecipesFromFirestore(); // Fetch recipes from Firestore
  const recipeList = document.getElementById("recipeList"); // The div or ul you want to populate
  recipelist.innerHTML = ""; 


  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("div"); // Create a new div for each recipe
    recipeItem.classList.add("recipe-item"); // Add some styling class to each div

    // Set the content of the div with recipe name and rating
    recipeItem.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>Rating: ${recipe.rating}</p>

    `;
    recipeItem.addEventListener("click", () => {
      showRecipeDetails(recipe);
    });

    // Append the recipe item to the recipe list
    recipelist.appendChild(recipeItem);
  });

function showRecipeDetails(recipe) {
  const recipeDetails = document.createElement("div");
  recipeDetails.classList.add("recipe-details");
  recipeDetails.innerHTML = `
    <h2>${recipe.name}</h2>
    <h3>Category: ${recipe.category}</h3>
    <h4>Ingredients:</h4>
    <p>${recipe.ingredients}</p>
    <h4>Steps:</h4>
    <p>${recipe.steps}</p>
    <h4>Rating: ${recipe.rating}</h4>
    <button id="closeRecipeDetails">Close</button>
  `;

  // Append to the body or a specific container
  document.body.appendChild(recipeDetails);

  // Add event listener to close the details view
  document.getElementById("closeRecipeDetails").addEventListener("click", () => {
    recipeDetails.remove(); // Remove details view
  });
}

}
async function getRecipesFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // Recipe ID
      name: doc.data().name, // Name of the recipe
      rating: doc.data().rating, // Rating of the recipe
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// Register Service Worker
const sw = new URL('service-worker.js', import.meta.url);
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(sw.href, { scope: '/Yummy/'})
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Error:', err));
}

;

//Call in the event listener for page load
//async function getApiKey() {
 // let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
 // apiKey =  snapshot.data().key;
 /// genAI = new GoogleGenerativeAI(apiKey);
  //model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//}
////Where I couldn't find the AI///
//async function askChatBot(request) {
 /// return await model.generateContent(request);
//}
///aiButton.addEventListener('click', async () => {
 /// let prompt = aiInput.value.trim().toLowerCase();
 /// if(prompt) {
  //  if(!ruleChatBot(prompt)){
 //     askChatBot(prompt);
 //   }
 // } else {
 //   appendMessage("Please enter a prompt")
//  }  
//});
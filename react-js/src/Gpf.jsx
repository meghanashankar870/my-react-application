import { useState } from "react";
import "./gpf.css";

export default function GitHubProfileFinder() {
  const [username, setUsername] = useState("");//Stores text from the input box
  const [profile, setProfile] = useState(null);//Stores GitHub profile data
  const [repos, setRepos] = useState([]);//Stores the list of repositories
  const [loading, setLoading] = useState(false);//Shows loading spinner
  const [error, setError] = useState("");//Displays an error message if something goes wrong

  //This is an arrow function declared inside your component.
  //It’s marked as async, meaning it will use await to handle asynchronous code (like API requests) cleanly.
  const getProfile = async () => {
    //trim()=>remove extra spaces
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    //Clears old data and sets up a loading state:
    //Removes any previous error messages
    //Shows the “Loading…” indicator

    setError("");
    setLoading(true);
    setProfile(null);
    setRepos([]);

    try {
        //This is an API call to GitHub:
        // fetch() sends a request to GitHub’s user API.
        //await pauses the code until the response comes back.
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();//converts data into a javascript object
    //Handelling invalid users means returns an 404 error and stops the function
      if (response.status === 404) {
        setError("User not found 😢");
        setLoading(false);
        return;
      }

      setProfile(data);//store profile data
      //another Api call to get the user's latest repositories
      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
      );
      const reposData = await repoResponse.json();
      setRepos(reposData);
    } catch (error) {  //If anything fails (like no internet or API issue),it logs the error and shows a user-friendly message.
      console.error("Error fetching profile:", error);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);//runs no matter what--hides the loading spinner
    }
  };

  //JSX looks like HTML, but it’s JavaScript underneath.
    //This code defines your app layout
  return (
    <div className="container">
      <h1>🔍 GitHub Profile Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          //onchnage updates state with every keystroke
          onChange={(e) => setUsername(e.target.value)}
        />
        {/*button runs getprofile() when clicked*/}
        <button onClick={getProfile}>Search</button>
      </div>{/*This is called two-way binding — input and state reflect each other.*/}

      {/*If loading is true → shows “Loading…”If error has text → shows it in red.*/}
      {loading && <div id="loader">Loading...</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    
      {/*Only runs if profile is not null (i.e., data was fetched).
        Displays image, name, bio, followers, and profile link.
        Uses logical OR (||) to handle missing data gracefully*/}
      {profile && (
        <div id="profile">
          <img
            src={profile.avatar_url}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <h2>{profile.name || "No name available"}</h2>
          <p>{profile.bio || "No bio available"}</p>
          <p>
            Followers: {profile.followers} | Following: {profile.following}
          </p>
          <p>Public Repos: {profile.public_repos}</p>
          <a href={profile.html_url} target="_blank">
            View GitHub Profile
          </a>
        </div>
      )}

      {/*conditional rendering*/}
      {repos.length > 0 && (
        <div id="repos">
          <h3>Latest Repositories:</h3>
          {/*.map() loops through each repo object and renders it */}
          {repos.map((repo) => (
            <div key={repo.id} className="repo">{/*key=[repo.id] helps react efficiently track list items*/}
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
              <p>
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

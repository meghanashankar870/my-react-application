import GitHubProfileFinder from "./Gpf"; //a react component built earlier 
//component means just a js functions that returns jsx
function App() { //here app is a root component where whole app begins
  return <GitHubProfileFinder />;//here rendering / calling another componenet
}

export default App;//This line exports your App component so it can be used in other files
//specificlly in our entry file main.jsx
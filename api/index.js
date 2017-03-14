const Api = {
  loadRepos: (username) => {
    const url = `https://api.github.com/users/${username}/repos`
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return json
      })
  }
}

export default Api

const 


async function getJokes() {
    let response = await fetch ('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?amount=10')
    let data = await response.json();
    console.log(data);
}
getJokes();


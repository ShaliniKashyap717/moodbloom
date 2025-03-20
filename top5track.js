// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAhrkElpIVlFWq3fmg8r5Op4ujmzcu0qS2sX0HsFTyJBF0ZyQ55gse-fpCy1cNB9vI3y9x_nOwTAFc5TsH2JfjGT4N3hVoGTFDDqfpsXUQzgwXVbNwKDDGURuBzgSWUbHF1rYNbDvaLRha18_JdMxyQ2_-eH1rDT5ELMcG-duM-pGbpSTpMNobDvP7P9yaLbZPi8A2pitzXoL_8wpY6lthay6cEHASOiVO-LVv60hCCdsoaB0pIt2Pr6J-0kYOhtApoTcVdaul2dHFvv1e5GhmUanNXBwm2sBp927Y-cniH24kWYzVsmFzB';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:5zCnGtCl5Ac5zlFHXaZmhy','spotify:track:7BqBn9nzAq8spo5e7cZ0dJ','spotify:track:131SfRMv57LKf8xtaSt39k','spotify:track:0eCajpR75pDW0r64U6hP2x','spotify:track:0TL0LFcwIBF5eX7arDIKxY'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My top tracks playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);

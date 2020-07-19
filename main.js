function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.querySelector('#token').addEventListener('click', () => {
	copy(document.querySelector('#token').innerHTML)
	document.querySelector('#token').style.border = '2px solid #4dd916'
})

function copy(text){
	let temp = document.createElement('textarea')
	temp.innerHTML = text
	document.body.append(temp)
	temp.focus()
	temp.select()
	document.execCommand("copy")
	temp.remove()
}

$.ajax({
	url: 'https://accounts.spotify.com/api/token',
	type: 'POST',
	headers: {
		'Authorization' : 'Basic MGIwZTZhZDUxMTQxNGUwNTgzNzU5MzJlNDc1NWFjYzM6N2QwMDk1YzA0ZjcxNDk5ZGJjZmE0Njc4MmVhNTE4NTU='
	},
	data: {
		'grant_type' : 'authorization_code',
		'code' : getParameterByName('code'),
		'redirect_uri' : 'https://example.com/callback'
	},
	success: function(data) {
		document.getElementById('token').innerHTML = data.refresh_token
	},
	error: function(err) {
		document.getElementById('token').innerHTML = err.responseJSON.error_description
	},
})
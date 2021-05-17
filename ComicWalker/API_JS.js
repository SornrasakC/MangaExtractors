// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xf).toString(16));
    }
    return hex.join("");
}

function generate_key(hash) {
    return hexToBytes(hash.slice(0, 16));
}

function URL(episode_id) {
    const endpoint_url = "https://ssl.seiga.nicovideo.jp";
    url = `${endpoint_url}/api/v1/comicwalker/episodes/${episode_id}/frames`;
    return url;
}

async function load(url) {
    return (await fetch(url)).body
}



// console.log(generate_key("0123456789ABCDEFGHIJKL"));

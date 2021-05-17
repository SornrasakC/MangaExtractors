from sys import argv
import requests
import json
import os
import itertools

endpoint_url = "https://ssl.seiga.nicovideo.jp"
OUT_DIR = "out"

# endpoint + "/api/v1/comicwalker/episodes/" + episode_id + "/frames"
# endpoint + "/api/v1/comicwalker/contents/" + episode_id


def generate_key(hash):
    return bytes.fromhex(hash[0:16])


if __name__ == "__main__":
    if len(argv) < 2:
        print("Usage: program_name episode_id")
        quit()

    episode_id = argv[1]
    chapter_dir = argv[2] if 2 < len(argv) else episode_id

    url = endpoint_url + "/api/v1/comicwalker/episodes/" + episode_id + "/frames"

    response = requests.get(url).json()

    # if response["meta"]["status"] != 200
    frame_data = response["data"]["result"]

    #raw_data = requests.get(frame_data[0].source_url, stream=True)
    # with open("temp.jpg", "wb") as fd:
    #	raw_data.iter_content(chunk_size=8)

    OUT_DIR += "/" + chapter_dir
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)

    num_pages = len(frame_data)

    print("Downloading chapter: {}".format(chapter_dir))

    for page_num, frame in enumerate(frame_data):
        print("Downloading page {:d}/{:d}".format(page_num + 1, num_pages))

        xor_key = generate_key(frame["meta"]["drm_hash"])
        raw_data = requests.get(frame["meta"]["source_url"]).content

        # f"{OUT_DIR}/{page_num}.jpg"
        with open("{}/{:d}.jpg".format(OUT_DIR, page_num), "wb") as f:
            f.write(
                bytes([i ^ j for i, j in zip(raw_data, itertools.cycle(xor_key))]))

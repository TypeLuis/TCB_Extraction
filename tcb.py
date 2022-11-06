import requests
from bs4 import BeautifulSoup as bs


def get_data(url):
    page = requests.get(url).text
    doc = bs(page, "html.parser")
    return doc


def parse(doc, chapter):
    div = doc.find(class_='col-span-2')
    item = div.find(text=f'One Piece Chapter {chapter}').parent.parent
    print(item)
    # links = doc.find_all(
    #     "a", {"class": "block border border-border bg-card mb-3 p-3 rounded"})
    # for link in links:
    #     print(link.text)

    # images = doc.find_all("img", {"class": "fixed-ratio-content"})
    # image_list = []
    # for image in images:
    #     source = image['src']
    #     print(source)


# url = "https://onepiecechapters.com/chapters/4716/one-piece-chapter-1065"
url = "https://onepiecechapters.com/mangas/5/one-piece"

doc = get_data(url)
parse(doc, 1052)

# print(get_data(url=url))

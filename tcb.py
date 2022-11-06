import requests
from bs4 import BeautifulSoup as bs


domain = "https://onepiecechapters.com"


def get_data(url):
    page = requests.get(url).text
    doc = bs(page, "html.parser")
    return doc


def parse(doc, chapter):
    # div = doc.find(class_='col-span-2')
    # item = div.find(text=f'One Piece Chapter {chapter}').parent.parent
    # print(item.find(class_='text-gray-500').text)

    links = doc.find_all(
        "a", {"class": "block border border-border bg-card mb-3 p-3 rounded"})

    chapter_list = []
    for link in links:

        chapter = {}

        title = link.find(class_='text-gray-500').text
        chapter = link.find(class_='text-lg font-bold').text
        url = f'{domain}{link["href"]}'

        if '.' in chapter:
            continue

        chapter["title"] = title
        chapter["chapter"] = chapter
        chapter["url"] = url

        chapter_list.append(chapter)

    print(chapter_list)

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

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scrape_url(url, depth=1):
    """
    指定されたURLをスクレイピングし、リンクされているページも追跡してスクレイピングする。
    
    :param url: スクレイピングするURL
    :param depth: 追跡する深さ（再帰レベル）
    :return: ページのタイトルと本文
    """
    try:
        # URLにリクエストを送信
        response = requests.get(url)
        response.raise_for_status()  # エラーチェック

        # ページのエンコーディングを自動検出して設定
        response.encoding = response.apparent_encoding

        # BeautifulSoupでHTMLを解析
        soup = BeautifulSoup(response.text, 'html.parser')

        # ページのタイトルを取得
        title = soup.title.string if soup.title else 'タイトルがありません'

        # ページのテキストを抽出（例としてbodyタグ内のテキスト）
        body_text = soup.body.get_text(separator='\n', strip=True) if soup.body else '本文がありません'

        # 結果の出力
        result = {
            'url': url,
            'title': title,
            'body_text': body_text
        }

        print(f"タイトル: {title}\nURL: {url}\n")

        # 再帰的にリンクを追跡する
        if depth > 0:
            # ページ内のすべてのリンクを抽出
            links = soup.find_all('a', href=True)

            for link in links:
                href = link['href']
                # 絶対URLに変換
                full_url = urljoin(url, href)
                
                # 内部リンクか外部リンクかを考慮してスキップする場合もある（例: 特定のドメインに限定するなど）
                if not full_url.startswith(url):
                    continue
                
                # 再帰的にリンク先もスクレイピング
                scrape_url(full_url, depth - 1)

        return result

    except requests.exceptions.RequestException as e:
        print(f"エラー: {e}")
        return None

# 使用例
url = "https://www.oit.ac.jp/"  # 仮のURLを使用
scraped_data = scrape_url(url, depth=1)

# スクレイピング結果をテキストファイルに保存
if scraped_data:
    with open("knowledge.txt", "w", encoding="utf-8") as file:
        file.write(f"タイトル: {scraped_data['title']}\n")
        file.write(f"URL: {scraped_data['url']}\n\n")
        file.write(f"ページの内容:\n{scraped_data['body_text']}\n")




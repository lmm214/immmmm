import requests
import json
import os
save_folder = './images/douban/'
# 确保文件夹路径存在
os.makedirs(save_folder, exist_ok=True)

json_file_path_movie = './data/douban/movie.json'
# 从本地JSON文件加载数据
with open(json_file_path_movie, 'r',  encoding='utf-8') as file_movie:
    data_movie = json.load(file_movie)
    # print(data_movie)

# 提取URL字段的值
for i in data_movie:
  image_url_movie = i['subject']['cover_url']
  # print(image_url_movie)
  # # 请求头
  headers = {
    'Referer': 'https://doubanio.com'
    }
  # 发送带有自定义请求头的GET请求获取图片数据
  response = requests.get(image_url_movie, headers=headers, timeout=10)
  file_name_movie = image_url.split('/')[-1]
  save_path_movie = os.path.join(save_folder, file_name_movie)
  # 保存图片到本地
  with open(save_path_movie, 'wb') as file_movie:
    file_movie.write(response.content)
  print(f'图片已保存为 {file_name_movie}')


json_file_path_book = './data/douban/book.json'
# 从本地JSON文件加载数据
with open(json_file_path_book, 'r',  encoding='utf-8') as file_book:
    data_book = json.load(file_book)
    # print(data_book)
# 提取URL字段的值
for j in data_book:
  image_url_book = j['subject']['cover_url']
  # print(image_url_book)
  # # 请求头
  headers = {
    'Referer': 'https://doubanio.com'
    }
  # 发送带有自定义请求头的GET请求获取图片数据
  response = requests.get(image_url_book, headers=headers, timeout=10)
  file_name_book = image_url_book.split('/')[-1]
  save_path_book = os.path.join(save_folder, file_name_book)
  # 保存图片到本地
  with open(save_path_book, 'wb') as file_book:
    file_book.write(response.content)
  print(f'图片已保存为 {file_name_book}')

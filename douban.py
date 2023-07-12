import requests
import json
import os
save_folder = './images/douban/'
json_file_path = './data/douban/movie.json'
# 确保文件夹路径存在
os.makedirs(save_folder, exist_ok=True)
# 从本地JSON文件加载数据
with open(json_file_path, 'r',  encoding='utf-8') as file:
    data = json.load(file)
    # print(data)

# 提取URL字段的值
for i in data:
  image_url = i['subject']['cover_url']
  # print(image_url)
  # # 请求头
  headers = {
    'Referer': 'https://doubanio.com'
    }
  # 发送带有自定义请求头的GET请求获取图片数据
  response = requests.get(image_url, headers=headers, timeout=10)
  file_name = image_url.split('/')[-1]
  save_path = os.path.join(save_folder, file_name)
  # 保存图片到本地
  with open(save_path, 'wb') as file:
    file.write(response.content)
  print(f'图片已保存为 {file_name}')